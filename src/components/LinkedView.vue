<template>
  <div class="mx-4">
    <div class="mb-4">
      <div class="select is-rounded mx-2">
        <select
          v-model="selectedLine1"
        >
          <option v-for="(option, index) in metaDataList.filter(el => el.line !== selectedLine2.line)" :value="option" :key="index">
            {{ option.displayName }}
          </option>
        </select>
      </div>
      <div class="select is-rounded mx-2">
        <select
          v-model="selectedLine2"
        >
          <option :value="blankLine">未選択</option>
          <option v-for="(option, index) in metaDataList.filter(el => el.line !== selectedLine1.line)" :value="option" :key="index">
            {{ option.displayName }}
          </option>
        </select>
      </div>
    </div>

    <div class="has-background-white mb-4">
      <h2 class="py-4">
        <span class="pb-1 has-text-weight-bold" :style="`border-bottom: 3px solid ${selectedLine1.color}`">{{ selectedLine1.displayName }}</span> vs. <span class="pb-1 has-text-weight-bold" :style="`border-bottom: 3px solid ${selectedLine2.color}`">{{ selectedLine2.displayName }}</span>
      </h2>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
        <!-- 軸 -->
        <line x1="0" y1="50" x2="1200" y2="50" stroke="lightgray" stroke-width="0.5"/>
        <line x1="0" y1="150" x2="1200" y2="150" stroke="lightgray" stroke-width="0.5" />

          <!-- 駅ごとのデータ -->
          <g v-for="(item, index) in timeDistanceData.filter(el => (selectedLine1.line.includes(el.line) || selectedLine2.line.includes(el.line)) && el.time !== '')" :key="index">
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
    </div>
    
    <div class="has-background-white mb-4">
      <h2 class="py-4 has-text-weight-bold"><span class="pb-1" :style="`border-bottom: 3px solid ${selectedLine1.color}`">{{ selectedLine1.displayName }}</span></h2>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" class="has-background-white">
        <!-- 軸 -->
        <line x1="0" y1="50" x2="1200" y2="50" stroke="lightgray" stroke-width="0.5"/>
        <line x1="0" y1="150" x2="1200" y2="150" stroke="lightgray" stroke-width="0.5" />

        <!-- 駅ごとのデータ -->
        <g v-for="(item, index) in timeDistanceData.filter(el => (selectedLine1.line.includes(el.line)) && el.time !== '')" :key="index">
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
          <polygon :points="getPoints(item, timeDistanceData.filter(el => (selectedLine1.line.includes(el.line)) && el.time !== '')[index-1], index)" :fill="getHeatMapColors(index)" stroke="black" opacity="0.8" />
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
    </div>

    <div class="has-background-white mb-4">
      <h2 class="py-4 has-text-weight-bold"><span class="pb-1" :style="`border-bottom: 3px solid ${selectedLine2.color}`">{{ selectedLine2.displayName }}</span></h2>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300">
        <!-- 軸 -->
        <line x1="0" y1="50" x2="1200" y2="50" stroke="lightgray" stroke-width="0.5"/>
        <line x1="0" y1="150" x2="1200" y2="150" stroke="lightgray" stroke-width="0.5" />

        <g v-for="(item, index) in timeDistanceData.filter(el => (selectedLine2.line.includes(el.line)) && el.time !== '')" :key="index">
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
          <polygon :points="getPoints(item, timeDistanceData.filter(el => (selectedLine2.line.includes(el.line)) && el.time !== '')[index-1], index)" :fill="getHeatMapColors(index)" stroke="black" opacity="0.8" />
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
    </div>
  </div>
</template>

<script>
import TXRapid from '../data/tx_rapid.json'
import TXSemiRapid from '../data/tx_semi_rapid.json'
import TXCommuterRapid from '../data/tx_commuter_rapid.json'
import TXLocal from '../data/tx_local.json'
import JobanSpecialRapid from '../data/joban_special_rapid.json'
import JobanLocal from '../data/joban_local.json'
import Chuo from '../data/chuo.json'
import KyotoShinkaisoku from '../data/kyoto_shinkaisoku.json'
import TokaidoSpecialRapid from '../data/tokaido_special_rapid.json'
import SobuRapid from '../data/sobu_rapid.json'
import TsukubaGo from '../data/tsukubago.json'
import KeiyoCommuterRapid from '../data/keiyo_commuter_rapid.json'
import OdakyuRapidExpress from '../data/odakyu_rapid_express.json'

export default {
  data: () => {
    return {
      blankLine: 
        {
          line: "",
          displayName: "未選択",
          color: ""
        },
      selectedLine1: TXRapid.metadata,
      selectedLine2: JobanSpecialRapid.metadata,
      metaDataList: [],
      stationMax: 0,
      timeDistanceData: ''
    }
  },
  mounted() {
    this.timeDistanceData = 
      TXRapid.data.filter(el => el.time !== '')
      .concat(TXSemiRapid.data.filter(el => el.time !== ''))
      .concat(TXCommuterRapid.data.filter(el => el.time !== ''))
      .concat(TXLocal.data.filter(el => el.time !== ''))
      .concat(JobanSpecialRapid.data.filter(el => el.time !== ''))
      .concat(JobanLocal.data.filter(el => el.time !== ''))
      .concat(Chuo.data.filter(el => el.time !== ''))
      .concat(SobuRapid.data.filter(el => el.time !== ''))
      .concat(KeiyoCommuterRapid.data.filter(el => el.time !== ''))
      .concat(OdakyuRapidExpress.data.filter(el => el.time !== ''))
      .concat(KyotoShinkaisoku.data.filter(el => el.time !== ''))
      .concat(TokaidoSpecialRapid.data.filter(el => el.time !== ''))
      .concat(TsukubaGo.data.filter(el => el.time !== ''))
    this.metaDataList = [
      TXRapid.metadata,
      TXSemiRapid.metadata,
      TXCommuterRapid.metadata,
      TXLocal.metadata,
      JobanSpecialRapid.metadata,
      JobanLocal.metadata,
      Chuo.metadata,
      SobuRapid.metadata,
      KeiyoCommuterRapid.metadata,
      OdakyuRapidExpress.metadata,
      KyotoShinkaisoku.metadata,
      TokaidoSpecialRapid.metadata,
      TsukubaGo.metadata,
    ],
    this.stationMax = Math.max(...this.metaDataList.map(el => el.stationSum))
    console.log(this.stationMax)
  },
  methods: {
    findColor(lineName) {
      return this.metaDataList.find(el => el.line == lineName)['color']
    },
    getHeatMapColors(index) {
      // console.log(index, `hsl(${(index-1)*320/20}, 75%, 50%`)
      return `hsl(${(index-1)*360/this.stationMax}, 75%, 50%)`
    },
    getPoints(current, before, index) {
      if (index == 0) {
        let tl = [30, 50]
        let tr = [current.time * 15 + 30, 50]
        let br = [current.distance * 15 + 30, 150]
        let bl = [30, 150]
        // console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
      else {
        let tl = [before.time * 15 + 30, 50]
        let tr = [current.time * 15 + 30, 50]
        let br = [current.distance * 15 + 30, 150]
        let bl = [before.distance * 15 + 30, 150]
        // console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
    },
  }
}
</script>
