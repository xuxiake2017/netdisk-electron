<template>
  <div class="container">
    <div class="header">
      <span>确认</span>
      <i
        class="iconfont icon-close"
        @click="onClose"
      />
    </div>
    <!-- <el-alert title="success alert" type="success" /> -->
    <div class="body">
      <div class="info">
        <InfoFilled
          style="width: 3em; height: 3em; color: #439AF1;"
        />
        <span style="margin-left: 20px;">确定退出</span>
      </div>
      <div class="btns">
        <ElButton
          type="primary"
          size="large"
          style="width: 100px;"
          @click="onConfirm"
        >
          确定
        </ElButton>
        <ElButton
          size="large"
          style="width: 100px;"
          @click="onCancel"
        >
          取消
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton } from 'element-plus';
import { ipcRenderer } from 'electron';
import { InfoFilled } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'Dialog',
  components: {
    InfoFilled,
    ElButton,
  },
  setup () {
    const onClose = () => {
      ipcRenderer.send('dialog-close')
    }
    const onConfirm = () => {
      ipcRenderer.send('close')
    }
    const onCancel = () => {
      ipcRenderer.send('dialog-close')
    }
    return {
      onClose,
      onConfirm,
      onCancel,
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
.header {
  -webkit-app-region: drag;
  // width: 100%;
  height: 50px;
  background: #FFF;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid #BAC5CC;
  color: #27313A;
  .iconfont {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .icon-close {
    font-size: 20px;
  }
}
.body {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

</style>