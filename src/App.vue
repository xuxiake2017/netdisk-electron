<template>
  <Header />
  <!-- <HelloWorld
    :msg="'HelloWorld'"
  /> -->
  <div class="u-flex">
    <LeftSide />
    <LeftSide2
      :currentPage="currentPage"
      @currentPageChange="onCurrentPageChange"
    />
    <Main v-if="currentPage === 'fileList'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header/index.vue';
import LeftSide from './components/LeftSide/index.vue';
import LeftSide2 from './components/LeftSide2/index.vue';
import Main from './components/Main/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Header,
    LeftSide,
    LeftSide2,
    Main,
  },
  setup () {
    const currentPage = ref('fileList')
    const onCurrentPageChange = (val) => {
      currentPage.value = val
    }
    return {
      currentPage,
      onCurrentPageChange,
    }
  }
})
</script>

<style>

</style>