<template>
  <div>
    <h1 class="hello-world">{{ msg }}</h1>
    <div
      class="img"
    ></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import imgUrl from '@/assets/1.jpg';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup () {
    const img = ref(imgUrl)
    return {
      img
    }
  },
  mounted () {
    console.log(this.img);
  }
})
</script>

<style lang="scss" scoped>
$color: #F90;

.hello-world {
  color: $color;
}

.img {
  width: 100px;
  height: 100px;
  background: url(../assets/1.jpg);
  background-size: contain;
}
</style>