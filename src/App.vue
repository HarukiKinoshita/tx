<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <!-- <LinkedView :time-distance-object="TsukubaExpress" /> -->
    <v-container>
      <h1 class="title py-4">つくばエクスプレスはどのくらい速いのか？</h1>
      <LinkedView :display-list="displayList" class="white" />
      <v-row>
        <template v-for="(item, index) in dataList">
          <v-col class="p-1" :key="index" cols="6" sm="3">
            <v-checkbox :id="item.line" :value="item" v-model="displayList" :label="item.displayName" :color="item.color"></v-checkbox>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <!-- {{ dataList }}
    <br>
    {{ displayList }} -->
  </v-app>
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
          displayName: "TX 快速",
          color: "#ff0000"
        },
        {
          line: "Joban",
          displayName: "常磐線 特別快速",
          color: "#0067c0"
        },
        {
          line: "Chuo",
          displayName: "中央線 中央特快",
          color: "#F15A22"
        },
        {
          line: "KyotoShinkaisoku",
          displayName: "京都線 新快速",
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
}
</style>
