<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
      <!-- 軸 -->
      <line x1="0" y1="50" x2="1200" y2="50" stroke="lightgray" stroke-width="0.5"/>
      <line x1="0" y1="150" x2="1200" y2="150" stroke="lightgray" stroke-width="0.5" />

      <!-- 駅ごとのデータ -->
      <g v-for="(item, index) in timeDistanceData" :key="index">
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
        <polygon :points="getPoints(item, timeDistanceData[index-1], index)" :fill="getHeatMapColors(index)" opacity="0.8" />
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
export default {
  data: () => {
    return {
    }
  },
  props: [
    'timeDistanceData'
  ],
  methods: {
    findColor(lineName) {
      return this.timeDistanceData.find(el => el.line == lineName)['color']
    },
    getPoints(current, before, index) {
      if (index == 0) {
        let tl = [30, 50]
        let tr = [current.time * 15 + 30, 50]
        let br = [current.distance * 15 + 30, 150]
        let bl = [30, 150]
        console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
      else {
        let tl = [before.time * 15 + 30, 50]
        let tr = [current.time * 15 + 30, 50]
        let br = [current.distance * 15 + 30, 150]
        let bl = [before.distance * 15 + 30, 150]
        console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
    },
    getHeatMapColors(index) {
      return `hsl(${(index-1)*(270/this.timeDistanceData.length)}, 75%, 50%)`
    }
  }
}
</script>
