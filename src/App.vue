<template>
  <div id="app">
    <!-- <LinkedView :time-distance-object="TsukubaExpress" /> -->
    <LinkedView :display-list="displayList" />
    <div v-for="(item, index) in dataList" :key="index">
      <input type="checkbox" :id="item.line" :value="item" v-model="displayList">
      <label :for="item.line">{{ item.displayName }}
        <span :style="`width: 200px; background: ${item.color} `">.</span>
      </label>
    </div>
    <!-- {{ dataList }}
    <br>
    {{ displayList }} -->
  </div>
</template>

<script>
import LinkedView from './components/LinkedView.vue'

export default {
  name: 'App',
  components: {
    LinkedView
  },
  data: () => {
    return {
      displayList: [],
      dataList: [
        {
          line: "TsukubaExpress", 
          displayName: "つくばエクスプレス快速",
          color: "#ff0000"
        },
        {
          line: "Joban",
          displayName: "常磐線特別快速",
          color: "#0067c0"
        },
        {
          line: "Chuo",
          displayName: "中央特快",
          color: "#F15A22"
        },
        {
          line: "KyotoShinkaisoku",
          displayName: "京都線新快速",
          color: "#0072BC"
        }
      ]
    }
  },
  mounted() {
    this.displayList = this.dataList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
