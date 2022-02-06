<template>
  <div id="app" class="has-background-light hero is-fullheight py-6">
    <main class="md:mx-2" :style="isShowModal ? 'filter: blur(3px)' : 'filter: blur(0)'">
      <h1 class="title mx-2 my-5">つくばエクスプレスは<br class="is-hidden-tablet" />どのくらい{{ this.mode=='distance' ? "速い" : "高い" }}のか？</h1>
      <LinkedView v-if="mode=='distance'" class="mb-5" />
      <LinkedViewFare v-if="mode=='fare'" class="mb-5" />
      <!-- <HeatMaps /> -->

      <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="つくばエクスプレスはどのくらい速いのか？" data-url="https://harukikinoshita.github.io/tx/" data-show-count="false">Tweet</a>
      <button class="ml-2 mb-4 button is-small is-rounded" @click="isShowModal = !isShowModal">解説を開く</button>
      <div class="mb-1">
        <a v-if="mode == 'fare'" @click="mode = 'distance'">「つくばエクスプレスはどのくらい速いのか？」を見る</a>
        <a v-if="mode == 'distance'" @click="mode = 'fare'">「つくばエクスプレスはどのくらい高いのか？」を見る</a>
      </div>
    </main>
    <p class="has-text-grey-light">Copyright &copy; 2022 Haruki Kinoshita</p>
    
    <div id="howto-modal" class="box" v-show="isShowModal">
      <p class="title is-4">図の見方</p>
      <p class="has-text-left is-size-7 mb-4">このコンテンツでは、ある駅まで電車が移動するのにかかる時間と距離を、<strong>時間軸</strong>(上の横線)と<strong>距離の軸</strong>(下の横線)を結ぶ線を使って表現しています。</p>
      <img class="mb-4 px-6" src="@/assets/howto.png"><br>
      <p class="has-text-left is-size-7">紫色の線を見てください。この電車は、始発駅を出発してから10分で<strong>7km</strong>走行し、A駅に到着しています。一方で、赤色の線で表される電車は、同じ時間で<strong>20km</strong>も進んでいます。つまり、この時点では<strong>赤色の電車の方が紫色の電車よりも遠くまで到達している</strong>ということがわかります。<br><br>
      このように、線が左右どちらにどの程度傾いているかを比べることで、2つの電車の到達時間・到達距離を比較することができます。</p>
      <button class="button is-success is-rounded mt-3" @click="isShowModal = false">コンテンツを見る</button>
    </div>
    <!-- <Sample /> -->
  </div>
</template>

<script>
import 'bulma/css/bulma.css'; 
import LinkedView from './components/LinkedView.vue'
import LinkedViewFare from './components/LinkedViewFare.vue'
// import Sample from './components/Sample.vue'
// import HeatMaps from './components/HeatMaps.vue'

export default {
  name: 'App',
  components: {
    LinkedView, LinkedViewFare
    // Sample
    // HeatMaps
  },
  data: () => {
    return {
      isShowModal: true,
      mode: 'distance'
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
#howto-modal {
  position: absolute;
  left: 0;
  right: 0;
  width: 80vw;
  max-width: 480px;
  margin-left: auto; 
  margin-right: auto;
  z-index: 20
}
</style>
