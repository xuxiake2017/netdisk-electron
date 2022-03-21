<template>
  <div class="u-flex-1 u-flex-col container">
    <ToolBar />
    <Breadcrumbs />
    <FileList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ToolBar from '@/components/ToolBar/index.vue';
import Breadcrumbs from '@/components/Breadcrumbs/index.vue';
import FileList from '@/components/FileList/index.vue';

export default defineComponent({
  name: 'Main',
  components: {
    ToolBar,
    Breadcrumbs,
    FileList,
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px);
  width: 0;
  background: #FBFBFB;
}
</style>