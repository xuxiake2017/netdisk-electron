<template>
  <div class="container">
    <div
      v-for="(item, index) in items"
      :key="item.label"
      class="item u-flex"
      :class="{
        'item--select': currentItemIndex === index,
      }"
      @click="onItemClick(index)"
    >
      <CaretRight
        v-if="item.showCaret"
        class="caret-right"
      />
      <MoreFilled
        v-if="item.showMore"
        class="show-more"
      />
      {{ item.label }}
    </div>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import {
  CaretRight,
  MoreFilled,
} from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    CaretRight,
    MoreFilled,
  },
  setup () {
    const currentItemIndex = ref(0)
    const items = [
      {
        label: '我的文件',
        showCaret: true,
        showMore: true,
      },
      {
        label: '我的分享',
        showCaret: false,
        showMore: false,
      },
      {
        label: '回收站',
        showCaret: false,
        showMore: false,
      },
      {
        label: '快捷访问',
        showCaret: true,
        showMore: false,
      },
    ]
    const onItemClick = (index) => {
      currentItemIndex.value = index
    }
    return {
      currentItemIndex,
      onItemClick,
      items,
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px);
  width: 160px;
  background: #F9FAFB;
  padding: 10px 0;
  box-sizing: border-box;
  user-select: none;
  border-right: 1px solid #F1F1F1;
}

.item {
  height: 38px;
  line-height: 38px;
  padding: 0 35px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  &:hover {
    background: #EDF6FB;
  }
  &--select {
    background: #E0F2FB;
    color: #06A8FF;
    position: relative;
    .caret-right {
      color: #06A8FF;
    }
    .show-more {
      color: #06A8FF;
    }
    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      background: #06A8FF;
      left: 0;
    }
  }
}

.caret-right {
  position: absolute;
  width: 1em;
  height: 1em;
  left: 15px;
  color: #AFB3BF;
}
.show-more {
  position: absolute;
  width: 1em;
  height: 1em;
  right: 15px;
  color: #AFB3BF;
}
</style>