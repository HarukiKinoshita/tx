<template>
  <div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" style="min-width: 1024px;">
          <!-- 軸 -->
          <line x1="0" :y1="lineOffset" x2="1200" :y2="lineOffset" stroke="lightgray" stroke-width="0.5"/>
          <line x1="0" :y1="200 - lineOffset" x2="1200" :y2="200 - lineOffset" stroke="lightgray" stroke-width="0.5" />

            <!-- 駅ごとのデータ -->
            
              <!-- Time line -->
              <circle
                :cx="10*scale + margin"
                :cy="lineOffset"
                r="2"
                fill="black"
              />
              <circle
                :cx="24*scale + margin"
                :cy="lineOffset"
                r="2"
                fill="black"
              />
              <!-- Distance line -->
              <circle
                :cx="20*scale + margin"
                :cy="200 - lineOffset"
                r="2"
                fill="black"
              />
              <!-- Path -->
              <line
                :x1="24*scale + margin"
                :y1="lineOffset"
                :x2="20*scale + margin"
                :y2="200 - lineOffset"
                :stroke="findColor('JobanSpecialRapid')"
                stroke-width="1"
              />
              <line
                :x1="10*scale + margin"
                :y1="lineOffset"
                :x2="20*scale + margin"
                :y2="200 - lineOffset"
                :stroke="findColor('TXRapid')"
                stroke-width="1"
              />
              <!-- <polygon :points="`30,lineOffset `+(item.time*scale + margin)+`,lineOffset `+(item.distance*scale + margin)+`, 200 - lineOffset 30, 200 - lineOffset`" fill="red" opacity="0.05" stroke="black" stroke-width="1" /> -->
              <!-- 所要時間 -->
              <text
                :x="10*scale + margin"
                y="40"
                font-size="10"
              >
                10
              </text>
              <text
                :x="24*scale + margin"
                y="40"
                font-size="10"
              >
                24
              </text>
              <!-- 営業キロ -->
              <text
                :x="20*scale + margin"
                y="160"
                font-size="10"
                writing-mode="tb"
              >
                20km
              </text>
              <!-- 駅名 -->
              <text
                :x="20*scale + margin"
                y="200"
                font-size="10"
                :fill="findColor('TXRapid')"
                writing-mode="tb"
              >
                A駅
              </text>
        </svg>
      
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
  components: {
  },
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
      farthestPoint: 0,
      timeDistanceData: '',
      scale: 0,
      margin: 30,
      lineOffset: 50
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
    this.farthestPoint = Math.max(Math.max(...this.timeDistanceData.map(el => el.distance)), Math.max(...this.timeDistanceData.map(el => el.time)))
    this.scale = (1200 - this.margin*2) / this.farthestPoint
    console.log("fartherst", this.farthestDistance)
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
        let tr = [current.time * 15 + this.margin, 50]
        let br = [current.distance * 15 + this.margin, 150]
        let bl = [30, 150]
        // console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
      else {
        let tl = [before.time * 15 + this.margin, 50]
        let tr = [current.time * 15 + this.margin, 50]
        let br = [current.distance * 15 + this.margin, 150]
        let bl = [before.distance * 15 + this.margin, 150]
        // console.log(index, tl + ' ' + tr + ' ' + br + ' ' + bl)
        return (tl + ' ' + tr + ' ' + br + ' ' + bl)
      }
    },
  },
}
</script>

<style scoped>
.rotate {
  transform: rotate(90deg);
}
</style>