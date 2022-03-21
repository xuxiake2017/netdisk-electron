<template>
  <div class="search-input u-flex">
    <input
      :value="value"
      class="search-input__inner"
      @input="$emit('value:update', $event.target.value)"
    >
    <Close
      class="svg-icon close-icon"
      style="height: 100%;"
      :style="{
        opacity: value.length === 0 ? 0 : 1
      }"
      @click="clearInput"
    />
    <i
      class="iconfont icon-vertical_line"
      style="color: #D5D7DC; user-select: none;"
    />
    <span style="color: #B3B6BD; user-select: none; cursor: pointer;">搜索</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Close,
} from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    Close,
  },
  props: {
    value: String
  },
  emits: [
    'value:update'
  ],
  setup (props, context) {
    const clearInput = () => {
      context.emit('value:update', '')
    }
    return {
      clearInput
    }
  }
})
</script>

<style lang="scss" scoped>
.search-input {
  padding: 8px 10px;
  border-radius: 100px;
  background: #F0F2F7;
  border: 1px solid #F0F2F7;
  &:hover {
    background: #FFF;
    border: 1px solid #06A4FB;
  }
  &__inner {
    border: none;
    background: transparent;
    width: 150px;
    &:focus {
      outline: 0;
    }
    
  }
  .close-icon {
    padding: 1px;
    width: 14px;
    &:hover {
      background: #F1F2F2;
      border-radius: 50%;
    }
  }
}
</style>