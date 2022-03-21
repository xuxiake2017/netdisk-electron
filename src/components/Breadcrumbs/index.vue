<template>
  <div class="bread-crumbs u-flex">
    <div class="nav-btns u-flex">
      <ArrowLeft class="svg-icon" />
      <ArrowRight
        class="svg-icon"
        style="margin-left: 15px;"
      />
      <CaretBottom
        class="svg-icon"
        style="margin-left: 10px;"
      />
      <RefreshRight
        class="svg-icon"
        style="margin-left: 5px;"
      />
      <i
        class="iconfont icon-vertical_line"
        style="color: #D6D8DD; margin: 0 5px;"
      />
    </div>
    <div class="bread-crumb-items u-flex">
      <BreadCrumbItem 
        v-for="item in breadcrumbs"
        :key="item.id"
        :bread-crumb-item="item"
      />
    </div>
    <div class="search-input-wrap u-flex">
      <i
        class="iconfont icon-vertical_line"
        style="color: #D6D8DD; margin: 0 5px;"
      />
      <SearchInput :value="searchInput" @value:update="searchInput = $event" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  ArrowLeft,
  ArrowRight,
  CaretBottom,
  RefreshRight,
} from '@element-plus/icons-vue'

import BreadCrumbItem from '@/components/BreadCrumbItem/index.vue';
import SearchInput from '@/components/SearchInput/index.vue';

export default defineComponent({
  name: 'Breadcrumbs',
  components: {
    ArrowLeft,
    ArrowRight,
    CaretBottom,
    RefreshRight,
    BreadCrumbItem,
    SearchInput,
  },
  setup () {
    const searchInput = ref('')
    return {
      breadcrumbs: [
        {
          name: '文档',
          id: 1
        },
        {
          name: '2017',
          id: 2
        },
      ],
      searchInput,
    }
  }
})
</script>

<style lang="scss" scoped>
$height: 38px;
$padding: 5px;
.bread-crumbs {
  width: 100%;
  padding: $padding 10px;
  height: $height + $padding * 2;
  // background: red;
  // margin-left: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #F1F1F1;
  // background: red;
  position: relative;

  .svg-icon {
    height: 100%;
  }
}

.nav-btns {
  height: $height;
  line-height: $height;
  // user-select: none;
  .iconfont {
    font-size: 18px;
  }
  .svg-icon {
    width: 18px;
  }
  *:hover {
    color: #06A4FB;
  }
}

.bread-crumb-items {
  height: $height;
  line-height: $height;
}

.search-input-wrap {
  position: absolute;
  right: 10px;
}
</style>