<template>
  <div class="mx-6">
    <div class="columns is-multiline is-mobile is-variable is-1 has-text-left">
      <div 
        class="column is-3-desktop is-4-tablet is-6-mobile"
        v-for="(item, i) in metaDataList"
        :key="i"
      >
        <input
          :id="'line' + i"
          type="checkbox"
          :value="item.line"
          v-model="selectedLines"
        >
        <label
          :for="'line' + i"
          class="checkbox ml-1"  
        >
          {{item.displayName}}
        </label>
      </div>
    </div>

    <div v-for="(line, index) in displayList" :key="index" class="mb-6">
      <p class="text-left">{{ line.displayName }}</p>
      <LinkedHeatView :time-distance-data="line.displayName" class="white" />
    </div>
  </div>
</template>

<script>
import LinkedHeatView from '../components/LinkedHeatView.vue'
import TsukubaExpress from '../data/tsukuba_express.json'
import Joban from '../data/joban.json'
import Chuo from '../data/chuo.json'
import KyotoShinkaisoku from '../data/kyoto_shinkaisoku.json'

export default {
  components: {
    LinkedHeatView
  },
  data: () => {
    return {
      selectedLines: [],
      metaDataList: [
        TsukubaExpress.metadata,
        Joban.metadata,
        Chuo.metadata,
        KyotoShinkaisoku.metadata
      ]
    }
  },
  props: ['displayList']
}
</script>