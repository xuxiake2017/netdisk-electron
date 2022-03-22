<template>
  <div
    class="file-table"
  >
    <table
      border="0"
      cellspacing="0"
      cellpadding="0"
      class="file-table__header"
      ref="tableHeaderRef"
      :style="{
        ...tableHeaderStyle,
        width: `${tableWidth}px`
      }"
      @mousemove="onMousemove"
      @mousedown="onMmousedown"
    >
      <colgroup>
        <col 
          v-for="column in columns"
          :key="column.name"
          :width="column.width"
        />
      </colgroup>
      <thead class="">
        <tr class="">
          <th
            v-for="(column, index) in columns"
            :key="column.name"
            class="file-table__cell"
            colspan="1"
            rowspan="1"
          >
            <div class="cell">
              <div class="u-flex">
                <ElCheckbox
                  v-if="index === 0"
                  style="line-height: 23px; height: 23px; vertical-align: middle; margin-right: 10px;"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                />
                <span>{{ column.label }}</span>
              </div>
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <ElScrollbar
      class="file-table__body-wrap"
      ref="scrollbar"
    >
      <table
        class="file-table__body"
        border="0"
        cellspacing="0"
        cellpadding="0"
        :style="{
          width: `${tableWidth}px`
        }"
      >
        <colgroup>
          <col 
            v-for="column in columns"
            :key="column.name"
            :width="column.width"
          />
        </colgroup>
        <tbody>
          <tr
            v-for="fileItem in fileData"
            :key="fileItem.id"
            :class="{
              'file-table__row--selected': fileItem.selected
            }"
            class="file-table__row"
          >
            <td
              v-for="(column, index) in columns"
              :key="column.name"
              class="file-table__cell"
              :class="{
                'file-table__cell--file-name': column.name === 'fileName'
              }"
              rowspan="1"
              colspan="1"
            >
              <div class="cell">
                <div class="u-flex full-w">
                  <ElCheckbox
                    v-if="index === 0"
                    style="line-height: 23px; height: 23px; vertical-align: middle; margin-right: 10px;"
                    v-model="fileItem.selected"
                  />
                  <svg
                    class="svg-icon"
                    aria-hidden="true"
                    style="height: 18px; width: 18px; margin-right: 10px;"
                    v-if="column.name === 'fileName'"
                  >
                    <use :xlink:href="`#${fileIcoFilter(fileItem.fileType)}`"></use>
                  </svg>
                  <div class="u-line-1 u-flex-1" style="min-width: 0;">
                    <template v-if="column.name === 'updateTime'">
                      {{ moment(fileItem[column.name]).format('YYYY-MM-DD HH:mm:ss') }}
                    </template>
                    <template v-else-if="column.name === 'fileType'">
                      {{ fileTypeFormat(fileItem[column.name]) }}
                    </template>
                    <template v-else-if="column.name === 'fileSize'">
                      {{ formatFileSize(fileItem[column.name]) }}
                    </template>
                    <template v-else>
                      {{ fileItem[column.name] }}
                    </template>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </ElScrollbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  CSSProperties,
  computed,
} from "vue";
import {
  ElCheckbox,
  ElScrollbar
} from 'element-plus';
import moment from 'moment';

import data from './data.json';
import { fileIcoFilter, FILE_TYPE, fileTypeFormat, formatFileSize } from './util/index';

export default defineComponent({
  name: "FileList",
  components: {
    ElCheckbox,
    ElScrollbar,
  },
  setup (props, context) {

    const tableHeaderRef = ref<HTMLTableElement | null>(null)
    const scrollbar = ref<any>(null)
    const columns = ref([
      {
        name: 'fileName',
        label: '文件名',
        width: 200,
      },
      {
        name: 'updateTime',
        label: '修改时间',
        width: 200,
      },
      {
        name: 'fileType',
        label: '类型',
        width: 100,
      },
      {
        name: 'fileSize',
        label: '大小',
        width: 100,
      },
    ])
    const fileData = ref(data.data.pageInfo.list.map(file => {
      return {
        ...file,
        selected: false
      }
    }))
    const tableWidth = ref(800)
    const selectedFileList = computed(() => fileData.value.filter(item => item.selected))
    const checkAll = computed(() => selectedFileList.value.length === fileData.value.length)

    const tableHeaderStyle = ref<CSSProperties>({
      cursor: 'default'
    })
    let canResize = false
    let initLocate = 0
    let draging = false
    let resizeIndex = 0
    let initVal: null | { name: string; label: string; width: number; } = null
    let initTableWidth: number = 0
    const totalPies = columns.value.reduce((previousValue, currentValue) => previousValue + currentValue.width, 0)
    const onMousemove = (e: MouseEvent) => {
      if (draging) {
        tableHeaderStyle.value.cursor = 'col-resize'
        return
      }
      const tableHeaderEle = tableHeaderRef.value
      const rects = tableHeaderEle?.getClientRects()
      const tableHeaderLeft = rects?.[0].left || 0
      const clientX = e.clientX
      let totalWidth = 0
      for (let index = 0; index < columns.value.length; index++) {
        const element = columns.value[index];
        totalWidth += tableWidth.value * (element.width / totalPies)
        // totalWidth += element.width
        if (totalWidth - (clientX - tableHeaderLeft) > 0 && totalWidth - (clientX - tableHeaderLeft) <= 10) {
          tableHeaderStyle.value.cursor = 'col-resize'
          resizeIndex = index
          canResize = true
          break
        } else {
          tableHeaderStyle.value.cursor = 'default'
          canResize = false
        }
      }
    }
    const onMmousedown = (e: MouseEvent) => {
      if (!canResize) return
      initLocate = e.pageX
      initVal = {
        ...columns.value[resizeIndex]
      }
      initTableWidth = tableWidth.value
      draging = true
      addDocumentMouseEvents()
    }
    const mousemoveHandler = (e: MouseEvent) => {
      if (initVal !== null) {
        const pageX = e.pageX
        columns.value[resizeIndex].width = initVal.width + pageX - initLocate
        tableWidth.value = initTableWidth + pageX - initLocate
      }
    }
    const mouseupHandler = (e: MouseEvent) => {
      removeDocumentEvents()
      draging = false
      scrollbar.value?.update()
    }
    const addDocumentMouseEvents = () => {
      window.document.addEventListener('mousemove', mousemoveHandler);
      window.document.addEventListener('mouseup', mouseupHandler);
    }

    const removeDocumentEvents = () => {
      window.document.removeEventListener('mousemove', mousemoveHandler);
      window.document.removeEventListener('mouseup', mouseupHandler);
    }

    const handleCheckAllChange = (val: boolean) => fileData.value.forEach(item => item.selected = val)
    return {
      tableHeaderRef,
      scrollbar,
      columns,
      fileData,
      selectedFileList,
      checkAll,
      tableHeaderStyle,
      FILE_TYPE,
      tableWidth,
      onMousemove,
      onMmousedown,
      handleCheckAllChange,
      fileIcoFilter,
      fileTypeFormat,
      formatFileSize,
      moment,
    }
  }
});
</script>

<style lang="scss" scoped>
.file-table {
  background: #FFF;
  height: calc(100% - 48px * 2);
  width: 100%;
  overflow: hidden;
  table {
    width: 100%;
    font-size: 12px;
    table-layout: fixed;
  }
}
.file-table__cell {
  padding: 8px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  z-index: 1;
  .cell {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 23px;
    padding: 0 12px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 50px;
  }
}

.file-table__header {
  user-select: none;
  .file-table__cell {
    border-right: 1px solid #EBEBEC;
    border-bottom: 1px solid #EBEBEC;
    padding: 3px 0;
    font-weight: 400;
    color: #757880;
    &:hover {
      background: #F6F8FB;
    }
  }
}
.file-table__body-wrap {
  height: calc(100% - 30px);
  overflow: auto;
}
.file-table__body {
  .file-table__row:hover:not(.file-table__row--selected) {
    td {
      background: #FAFAFC;
    }
  }
  .file-table__row--selected {
    td {
      background: #EAF6FD;
    }
  }
  .file-table__cell {
    color: #333333;
    &:not(.file-table__cell--file-name) {
      color: #757880;
    }
  }
}
</style>