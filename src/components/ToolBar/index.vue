<template>
  <div class="tool-bar u-flex">
    <el-button
      round
      :icon="Upload"
      color="#06A4FB"
      style="color: white; width: 90px;"
    >
      上传
    </el-button>
    <div class="btn-group u-flex">
      <div class="btn-group-item u-flex">
        <folder-add class="svg-icon btn-group-item--icon" />
        <span class="btn-group-item--text">新建文件夹</span>
      </div>
      <i
        class="iconfont icon-vertical_line"
        style="color: #06A4FA; margin: 0 5px;"
      />
      <div class="btn-group-item u-flex">
        <document-add class="svg-icon btn-group-item--icon" />
        <span class="btn-group-item--text">新建在线文档</span>
        <caret-bottom class="svg-icon btn-group-item--icon" />
        <span class="badge">NEW</span>
      </div>
      <i
        class="iconfont icon-vertical_line"
        style="color: #06A4FA; margin: 0 5px;"
      />
      <div class="btn-group-item u-flex">
        <download class="svg-icon btn-group-item--icon" />
        <span class="btn-group-item--text">离线下载</span>
        <caret-bottom class="svg-icon btn-group-item--icon" />
      </div>
    </div>
    <div class="right-icons u-flex">
      <i class="iconfont">&#xe66d;</i>
      <Menu 
        class="svg-icon"
        style="margin-left: 10px; margin-right: 10px;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ElButton,
} from 'element-plus'
import {
  Upload,
  DocumentAdd,
  FolderAdd,
  Download,
  CaretBottom,
  Menu
} from '@element-plus/icons-vue'

export default {
  components: {
    ElButton,
    DocumentAdd,
    FolderAdd,
    Download,
    CaretBottom,
    Menu,
  },
  setup () {
    return {
      Upload,
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 38px;
$padding: 5px;
.tool-bar {
  width: calc(100% - 10px);
  padding: $padding 0;
  height: $height + $padding * 2;
  // background: red;
  margin-left: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #F1F1F1;
  position: relative;
  .svg-icon {
    height: 100%;
  }
}
.btn-group {
  height: 100%;
  background: #ECF6FB;
  border-radius: 100px;
  color: #06A4FA;
  padding: 0 15px;
  margin-left: 15px;
  user-select: none;
}
.btn-group-item {
  height: 100%;
  position: relative;
  cursor: pointer;
  &--text {
    height: $height;
    line-height: $height;
    display: inline-block;
    margin-left: 3px;
  }
  &:hover {
    .btn-group-item--text {
      font-weight: 600;
    }
  }
}
.badge {
  position: absolute;
  display: inline-block;
  border-radius: 200px;
  border-bottom-left-radius: 0;
  font-size: 10px;
  height: 15px;
  line-height: 15px;
  padding: 0 5px;
  color: #FFF;
  background: #F91F64;
  right: 0px;
  top: -5px;
}
.right-icons {
  position: absolute;
  right: 0;
  height: $height;
  line-height: $height;
  user-select: none;
  .iconfont {
    font-weight: 600;
  }
  .svg-icon {
    width: 18px;
  }
  *:hover {
    color: #06A4FB;
  }
}
</style>