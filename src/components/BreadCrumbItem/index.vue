<template>
  <div
    class="u-flex bread-crumb-item"
    :style="$attrs.style"
  >
    <span>{{ breadCrumbItem.name }}</span>
    <i
      class="iconfont"
      style="margin-left: 5px;"
    >&#xe60d;</i>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { BreadCrumbItem } from '@/typings/index';

export default defineComponent({
  props: {
    breadCrumbItem: {
      type: Object as PropType<BreadCrumbItem>,
      required: true
    },
  }
})
</script>

<style lang="scss" scoped>
.bread-crumb-item {
  user-select: none;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    color: #06A4FB;
  }
  &+& {
    margin-left: 10px;
  }
}
</style>