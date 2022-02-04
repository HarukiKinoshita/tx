<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
      <!-- 軸 -->
      <line x1="0" y1="50" x2="1200" y2="50" stroke="lightgray" stroke-width="0.5"/>
      <line x1="0" y1="150" x2="1200" y2="150" stroke="lightgray" stroke-width="0.5" />

      <!-- 駅ごとのデータ -->
      <g v-for="(item, index) in timeDistanceData.filter(el => displayList.map(el => el.line).includes(el.line) && el.time !== '')" :key="index">
        <!-- Time line -->
        <circle
          :cx="item.time*15 + 30"
          cy="50"
          r="2"
          fill="black"
        />
        <!-- Distance line -->
        <circle
          :cx="item.distance*15 + 30"
          cy="150"
          r="2"
          fill="black"
        />
        <!-- Path -->
        <line
          :x1="item.time*15 + 30"
          y1="50"
          :x2="item.distance*15 + 30"
          y2="150"
          :stroke="findColor(item.line)"
          stroke-width="1"
        />
        <!-- <polygon :points="`30,50 `+(item.time*15 + 30)+`,50 `+(item.distance*15 + 30)+`, 150 30, 150`" fill="red" opacity="0.05" stroke="black" stroke-width="1" /> -->
        <!-- 所要時間 -->
        <text
          :x="item.time*15 + 28"
          y="40"
          font-size="10"
        >
          {{ item.time }}
        </text>
        <!-- 営業キロ -->
        <text
          :x="item.distance*15 + 28"
          y="160"
          font-size="10"
          writing-mode="tb"
        >
          {{ item.distance }}km
        </text>
        <!-- 駅名 -->
        <text
          :x="item.distance*15 + 28"
          y="200"
          font-size="10"
          :fill="findColor(item.line)"
          writing-mode="tb"
        >
          {{ item.station }}
        </text>
      </g>
    </svg>
    <!-- <div v-for="(item, index) in TsukubaExpress" :key="index">
      {{ item.station }} {{ item.time }}, {{ item.time !== '' }}
    </div> -->
  </div>
</template>

<script>
import TsukubaExpress from '../data/tsukuba_express.json'
import Joban from '../data/joban.json'
import Chuo from '../data/chuo.json'
import KyotoShinkaisoku from '../data/kyoto_shinkaisoku.json'

export default {
  data: () => {
    return {
      TsukubaExpress: TsukubaExpress,
      timeDistanceData: TsukubaExpress.concat(Joban).concat(Chuo).concat(KyotoShinkaisoku)
    }
  },
  props: {
    // timeDistanceObject: Array 
    displayList: Array
  },
  methods: {
    findColor(lineName) {
      return this.displayList.find(el => el.line == lineName)['color']
    }
  }
}
</script>
