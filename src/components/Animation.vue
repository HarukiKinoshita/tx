<template>
  <div class="box-cat has-background-info"
    :style="{
      transform: `translate(${x}px, 250px)`
    }"
  />
</template>

<script>
import TXRapid from '../data/tx_rapid.json'

export default {
  data () {
    return {
      x: 100
    }
  },
  methods: {
    moveTo (x) {
      this.x = x
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>
.box-cat {
  position: absolute;
  width: 80px;
  height: 80px;
  margin-left: -40px;
  box-sizing: border-box;
  transform-origin: 50% 100%;
  transition: transform 500ms;
}
</style>