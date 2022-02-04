<template>
  <div id="app" class="has-background-light hero is-fullheight py-6">
    <main class="container">
      <h1 class="title py-4">つくばエクスプレスはどのくらい速いのか？</h1>
      <LinkedView class="mb-6" />
      <!-- <HeatMaps /> -->
    </main>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'; 
import LinkedView from './components/LinkedView.vue'
// import HeatMaps from './components/HeatMaps.vue'

export default {
  name: 'App',
  components: {
    LinkedView, 
    // HeatMaps
  },
  data: () => {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: 
    -apple-system, BlinkMacSystemFont, 
    "Helvetica Neue",
    Arial,
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    Meiryo,
    sans-serif !important;
  font-feature-settings: "palt";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
