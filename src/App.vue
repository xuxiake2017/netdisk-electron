<template>
  <Header />
  <!-- <HelloWorld
    :msg="'HelloWorld'"
  /> -->
  <div class="u-flex">
    <LeftSide />
    <LeftSide2 />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header/index.vue';
import LeftSide from './components/LeftSide/index.vue';
import LeftSide2 from './components/LeftSide2/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Header,
    LeftSide,
    LeftSide2,
  }
})
</script>

<style>

</style>