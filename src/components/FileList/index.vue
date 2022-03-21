<template>
  <div class="file-table">
    <table
      :style="tableHeaderStyle"
      class="file-table__header"
      ref="tableHeaderRef"
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
            v-for="column in columns"
            :key="column.name"
            class="file-table__cell"
            colspan="1"
            rowspan="1"
          >
            <div class="cell">{{ column.label }}</div>
          </th>
        </tr>
      </thead>
    </table>
    <table class="file-table__body">
      <colgroup>
        <col 
          v-for="column in columns"
          :key="column.name"
          :width="column.width"
        />
      </colgroup>
      <tbody>
        <tr class="el-table__row">
          <td
            class="file-table__cell"
            rowspan="1"
            colspan="1"
          >
            <div class="cell">2016-05-03</div>
          </td>
          <td
            class="file-table__cell"
            rowspan="1"
            colspan="1"
          >
            <div class="cell">Tom</div>
          </td>
          <td
            class="file-table__cell"
            rowspan="1"
            colspan="1"
          >
            <div class="cell">No. 189, Grove St, Los Angeles</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  CSSProperties,
} from "vue";

export default defineComponent({
  name: "FileList",
  setup (props, context) {

    const tableHeaderRef = ref<HTMLTableElement | null>(null)
    const columns = ref([
      {
        name: 'Date',
        label: 'Date',
        width: 200,
      },
      {
        name: 'Name',
        label: 'Name',
        width: 100,
      },
      {
        name: 'Address',
        label: 'Address',
        width: 100,
      },
    ])
    const tableHeaderStyle = ref<CSSProperties>({
      cursor: 'default'
    })
    let canResize = false
    let initLocate = 0
    let draging = false
    let resizeIndex = 0
    let initVal: null | { name: string; label: string; width: number; } = null
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
        totalWidth += element.width
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
      draging = true
      addDocumentMouseEvents()
    }
    const mousemoveHandler = (e: MouseEvent) => {
      if (initVal !== null) {
        const pageX = e.pageX
        columns.value[resizeIndex].width = initVal.width + pageX - initLocate
      }
    }
    const mouseupHandler = (e: MouseEvent) => {
      removeDocumentEvents()
      draging = false
    }
    const addDocumentMouseEvents = () => {
      window.document.addEventListener('mousemove', mousemoveHandler);
      window.document.addEventListener('mouseup', mouseupHandler);
    }

    const removeDocumentEvents = () => {
      window.document.removeEventListener('mousemove', mousemoveHandler);
      window.document.removeEventListener('mouseup', mouseupHandler);
    }
    return {
      tableHeaderRef,
      columns,
      tableHeaderStyle,
      onMousemove,
      onMmousedown,
    }
  }
});
</script>

<style lang="scss" scoped>
.file-table {

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
  }
}

.file-table__header {
  user-select: none;
  .file-table__cell {
    border-right: 1px solid #EBEBEC;
    border-bottom: 1px solid #EBEBEC;
  }
}
</style>