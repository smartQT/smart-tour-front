<script>
import { mapActions } from 'vuex'
import { formatLengthUnit } from '@/utils/format'

export default {
  name: 'TripMap',
  props: {
    mode: { // 'screenFix' || 'widthFix'
      type: String,
      default: 'screenFix'
    },
    height: {
      type: [String, Number],
      default: '100vh'
    },
    customStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      mapId: 'map-container',
      position: {}
    }
  },
  computed: {
    mapStyle() {
      let styleObj
      switch (this.mode) {
        case 'screenFix':
          styleObj = {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: this.getMapHeight()
          }
          break
        case 'widthFix':
          styleObj = {
            width: '100vw'
          }
      }

      return styleObj
    },
    formatHeight() {
      return formatLengthUnit(this.height)
    },
    formatStyle() {
      return {
        ...this.mapStyle,
        height: this.height,
        ...this.customStyle
      }
    }
  },
  mounted() {
    // #region  非 H5 地图相关
    /* #ifndef H5 */
    // H5 端因为可能会使用 google 而导致无法获取位置，因此直接使用高德 api 进行定位
    uni.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('当前位置的经度：' + res.longitude)
        console.log('当前位置的纬度：' + res.latitude)
      },
      fail() {
        console.log('获取位置失败')
      }
    })
    /* #endif  */
    // #endregion

    /* #ifdef H5 */
    this.initMap(this.mapId).then(
      () => {
        // 添加插件
        this.addlocationPlugin()
        this.addDrivingPlugin()

        // 添加地图控件插件，并显示到地图上
        this.addToolbarPlugin()
        this.showToolbar()
        // this.addControlToMap(control)

        // 定位
        return this.getLocation()
      },
      err => {
        console.log('initMap: ', err)
      }
    ).then(
      () => {
        const position = this.position = this.$store.getters.position
        this.setCenter(position)
      },
      err => {
        console.log('trip-map: ', err)
      }
    )
    /* #endif */
  },
  methods: {
    // 返回 H5 端地图容器高度
    getMapHeight() {
      /* #ifndef H5 */
      return '100vh'
      /* #endif  */
      /* #ifdef H5 */
      // eslint-disable-next-line no-unreachable
      return 'calc(100vh - 50px)'
      /* #endif  */
    },

    ...mapActions({
      initMap: 'map/initMap',
      setCenter: 'map/setCenter',
      addlocationPlugin: 'map/addlocationPlugin',
      addDrivingPlugin: 'map/addDrivingPlugin',
      getLocation: 'map/getLocation',
      addToolbarPlugin: 'map/addToolbarPlugin',
      showToolbar: 'map/showToolbar',
      hideToolbar: 'map/hideToolbar'
    })
  }
}
</script>

<template>
  <div class="trip-map">
    <!-- #ifndef H5 -->
    <map
      :style="{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: getMapHeight()
      }"
      :longitude="longitude"
      :latitude="latitude"
      :scale="13"
    />
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <div :id="mapId" :style="formatStyle" />
    <!-- #endif -->
  </div>
</template>
