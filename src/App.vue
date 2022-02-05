<template>
  <div id="app" class="has-background-light hero is-fullheight py-6">
    <main class="md:mx-2">
      <h1 class="title mx-2 py-4">つくばエクスプレスは<br class="is-hidden-tablet" />どのくらい速いのか？</h1>
      <LinkedView class="mb-6" />
      <!-- <HeatMaps /> -->
    </main>
    <p class="has-text-grey-light">Copyright &copy; 2022 Haruki Kinoshita</p>
    <div class="box" style="position: absolute; left: 0; right: 0; width: 80vw; margin-left: auto; margin-right: auto; z-index: 20;" v-show="isShowModal">
      <p class="title">はじめに</p>
      <img class="mb-4" src="@/assets/howto.png">
      <p class="has-text-left">この図は、電車がある駅まで移動するのにかかる時間と距離を、時間軸(上の横線)と距離の軸(下の横線)を結ぶ線を使って表現しています。<br><br>
      赤色の線を見てください。この電車は、出発駅から20km地点にあるA駅に<strong>10分</strong>で到着しています。一方で、紫色の線で表される電車は、同じ距離を走るのに<strong>24分</strong>もかかっています。つまり、この時点では赤色の電車の方が紫色の電車よりも速いということです。
      このように、線が左上から右下に傾いているほどスピードが速く、右上から左下に傾いているほどスピードが遅いことを示しています。</p>
      <button class="button is-rounded mt-3" @click="isShowModal = false">閉じる</button>
    </div>
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
      isShowModal: true
    }
  },
  created() {
    console.log("hello")
    this.isShowModal = true
  }
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
