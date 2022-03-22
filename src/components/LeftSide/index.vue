<template>
  <div class="container">
    <div
      class="u-flex-col u-col-center left-side-item"
      :class="{
        'left-side-item--select': currentItemIndex === 0
      }"
      @click="currentItemIndex = 0"
    >
      <Cloudy
        class="element-icon"
      />
      <span>首页</span>
    </div>
    <div
      class="u-flex-col u-col-center left-side-item"
      :class="{
        'left-side-item--select': currentItemIndex === 1
      }"
      @click="currentItemIndex = 1"
    >
      <Sort
        class="element-icon"
      />
      <span>传输</span>
    </div>
    <div
      class="u-flex-col u-col-center left-side-item"
      :class="{
        'left-side-item--select': currentItemIndex === 2
      }"
      @click="currentItemIndex = 2"
    >
      <User
        class="element-icon"
      />
      <span>好友</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
  Cloudy,
  Sort,
  PartlyCloudy,
  User,
} from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    Cloudy,
    Sort,
    User,
  },
  setup () {
    const currentItemIndex = ref(0)
    return {
      currentItemIndex,
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px);
  width: 65px;
  // background: #FF0000;
  background: #FFF;
  box-shadow: 3px 0px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  box-sizing: border-box;
  user-select: none;
  z-index: 1;
}
.left-side-item {
  font-size: 14px;
  margin: 25px 0;
  color: #AAB5CB;
  cursor: pointer;
  // &+& {
  //   margin-top: 10px;
  // }

  .element-icon {
    width: 2em;
    height: 2em;
  }
  &--select {
    color: #06A7FF;
    font-weight: 600;
  }
}
</style>