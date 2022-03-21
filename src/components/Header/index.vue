<template>
  <div class="header">
    <img
      class="logo"
      :src="LogoImg"
    />
    <div class="opt-btns">
      <span style="display: inline-block; height: 32px; line-height: 32px; font-size: 14px; color: #0065DD;">限时低价！激活超级会员</span>
      <svg
        class="svg-icon"
        aria-hidden="true"
        style="margin-left: 25px;"
      >
        <use xlink:href="#icon-liwu"></use>
      </svg>
      <img
        :src="avatarImg"
        style="width: 32px; height: 32px; line-height: 32px; vertical-align: middle; border-radius: 16px; margin-left: 25px;"
      >
      <span style="display: inline-block; height: 32px; line-height: 32px; margin-left: 5px;">非常攻破</span>
      <i
        class="iconfont icon-f-vip"
        style="color: #BDBDBD; margin-left: 5px; display: inline-block; height: 32px; line-height: 32px;"
      />
      <span style="display: inline-block; height: 32px; line-height: 32px; font-size: 14px; font-weight: 600; color: #0065DD; margin-left: 25px;">认证额外得50G空间</span>
      <el-button
        color="#EBC077"
        style="font-size: 14px; color: #000; -webkit-app-region: no-drag; margin-left: 25px;"
        round
      >
        <span class="badge-wrap">
          开通超级会员
          <span class="badge">最高减62元</span>
        </span>
      </el-button>
      <svg
        class="svg-icon"
        aria-hidden="true"
        style="margin-left: 45px;"
      >
        <use xlink:href="#icon-games"></use>
      </svg>
      <i
        class="iconfont icon-youjian"
        style="margin-left: 12px;"
      />
      <i
        class="iconfont icon-shezhi"
      />
      <i
        class="iconfont icon-vertical_line"
        style="-webkit-app-region: drag; color: #D6D8DD;"
      />
      <i
        class="iconfont icon-zuixiaohua"
        @click="onMinimize"
      />
      <i
        class="iconfont icon-zuidahua_huaban1"
        @click="onMaximize"
      />
      <i
        class="iconfont icon-close"
        @click="onClose"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ipcRenderer } from 'electron';
import { ElButton } from 'element-plus'

// import LogoImg from '@/assets/Logo.png';
import LogoImg from '@/assets/Logo.jpg';
import avatarImg from '@/assets/avatar.jpg';

export default defineComponent({
  name: 'Header',
  components: {
    ElButton,
  },
  setup () {
    const onMinimize = () => {
      ipcRenderer.send('minimize')
    }
    const onMaximize = () => {
      ipcRenderer.send('maximize')
    }
    const onClose = () => {
      ipcRenderer.send('close')

      // ElMessageBox.confirm(
      //   '确认要退出软件吗？',
      //   '提示',
      //   {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning',
      //   }
      // ).then(() => {
      //   ipcRenderer.send('close')
      // })
    }
    return {
      LogoImg,
      avatarImg,
      onMinimize,
      onMaximize,
      onClose
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  -webkit-app-region: drag;
  // width: 100%;
  height: 50px;
  background: #FFF;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 9;
}
.logo {
  width: 142px;
  height: 32px;
}
.opt-btns {
  position: absolute;
  right: 20px;
  display: flex;
  align-content: center;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
.iconfont {
  color: #000000;
  font-weight: 600;
  -webkit-app-region: no-drag;
  // height: 16px;
  // width: 16px;
  &+& {
    margin-left: 12px;
  }
  &:hover {
    color: #06A4FB;
  }
}

.badge-wrap {
  position: relative;
}
.badge {
  position: absolute;
  display: inline-block;
  border-radius: 200px;
  border-bottom-left-radius: 0;
  font-size: 10px;
  height: 15px;
  line-height: 15px;
  padding: 0 8px;
  color: #FFF;
  background: #F84A52;
  left: 75px;
  top: -15px;
}
</style>