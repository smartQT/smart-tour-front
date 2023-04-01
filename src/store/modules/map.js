import AMapLoader from '@amap/amap-jsapi-loader'

const state = {
  key: '826fa96b64ba5765f9a9ab040d66aa12', // 密钥
  mapStyleId: 'fd452bb26eefeef3d08000ca6cb73f56', // 自定义主题 id
  securityJsCode: '0fa1b21c93fabcc4e41c109e3f77bd6a', // 安全钥匙

  AMap: null,
  map: null,

  longitude: 116.397128,
  latitude: 39.917537,

  driving: null,
  travelMode: {},
  currentTarvelMode: null,
  geolocation: null,
  toolbar: null
}

const mutations = {
  SET_MAP(state, map) {
    state.map = map
  },
  SET_AMAP(state, AMap) {
    state.AMap = AMap
  },
  SET_POSITION(state, position) {
    const { lng, lat } = position
    state.longitude = lng
    state.latitude = lat
  },
  /**
   * 将已将添加的出行方式对象的插件添加到 trabelMode(出行模式列表)上
   * @author joyxin
   * @param {object} mode {modeName: modeValue}
   */
  ADD_TRAVEL_MODE(state, mode) {
    const [[modeName, modeValue]] = Object.entries(mode)

    if (state.travelMode[modeName]) return

    state.travelMode[modeName] = modeValue
  },
  SET_CURRENT_TRAVEL_MODE(state, mode) {
    state.currentTarvelMode = mode
  },
  SET_GEOLOCATION(state, geolocation) {
    state.geolocation = geolocation
  },
  SET_TOOLBAR(state, toolbar) {
    state.toolbar = toolbar
  }
}

const actions = {
  /**
   * 初始化 H5 端地图
   * @author joyxin
   * @param {*} containerId 容器ID
   * @returns Promise
   */
  initMap({ state, commit, dispatch }, containerId) {
    window._AMapSecurityConfig = { securityJsCode: state.securityJsCode }

    return new Promise((resolve, reject) => {
      // 加载地图
      AMapLoader.load({ // 首次调用 load
        key: state.key,
        version: '2.0',
        plugins: []
        // zoom: 12 // 初始地图级别
      }).then((AMap) => {
        // 指定地图容器
        const map = new AMap.Map(containerId)
        commit('SET_MAP', map)
        commit('SET_AMAP', AMap)

        dispatch('setStyle')

        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  },

  /**
   * 设置地图样式， 进行地图样式的变更
   * @author joyxin
   */
  setStyle({ state }) {
    state.map.setMapStyle(`amap://styles/${state.mapStyleId}`)
  },

  /**
   * 设置地图中心
   * @author joyxin
   * @param {Array} position 包含经纬度的数组
   */
  setCenter({ state }, /* position */[longitude, latitude]) {
    const { map, AMap } = state
    const position = new AMap.LngLat(longitude, latitude)

    map.setCenter(position)
  },

  /**
   * 没有实质作用，主要找不到导致 报错 ([vuex] unknown local action type: setMapCenter, global type: map/setMapCenter) 的地方
   * 所以整了这个来触发 setCenter 这个action
   * @author joyxin
   */
  setMapCenter({ dispatch, state }, /* position */[longitude, latitude]) {
    dispatch('setCenter', [longitude, latitude])
  },

  // 地图缩放至指定级别并以指定点为地图显示中心点
  setZoomAndCenter({ state, dispatch }) {
    const { map } = state

    dispatch('getLocation').then(
      (res) => {
        map.setZoomAndCenter(11, res, false, 1000)
      },
      err => {
        map.setZoomAndCenter(11, [state.longitude, state.latitude], false, 1000)

        console.log('store/module/map: ', err)
      }
    )
  },

  /**
   * H5 端地图添加定位插件（高德）
   * @author joyxin
   * @returns Promise
   */
  addlocationPlugin({ commit, state }) {
    const AMap = state.AMap

    AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量
        offset: [10, 20],
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        position: 'RB'
      })

      commit('SET_GEOLOCATION', geolocation)
    })
  },

  /**
   * @author joyxin
   * 引入和创建驾车规划插件
   */
  addDrivingPlugin({ commit, state }) {
    const { AMap, map } = state

    AMap.plugin('AMap.Driving', () => {
      const driving = new AMap.Driving({
        // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
        policy: AMap.DrivingPolicy.LEAST_TIME,
        map: map
      })

      commit('ADD_TRAVEL_MODE', { driving })
    })
  },

  /**
   * 绘制路由出行路线
   * @author joyxin
   * @param {object} {}mode, point}
   * @param {string} mode 出行方式，暂时可选 driving
   * @param {array} point [longitude, latitude]
   * @returns
   */
  routePlanning({ state, dispatch, commit }, { mode, point }) {
    console.log(point)
    const startLngLat = [121.695669936479, 31.1931987662758]

    return new Promise((resolve, reject) => {
      // state.travelMode[mode].search(point, [121.505644875161, 31.2352829956439], () => { })
      state.travelMode[mode].search(startLngLat, point, (status, result) => {
        if (status === 'complete') {
          commit('SET_CURRENT_TRAVEL_MODE', mode)
          dispatch('setMapCenter', startLngLat)

          resolve('绘制驾车路线完成')
        } else {
          reject('获取驾车数据失败：' + result)
        }
      })
    })
  },

  stopRoutePlanning({ state }) {
    const { travelMode, currentTarvelMode } = state
    travelMode[currentTarvelMode].clear()
  },

  /**
   * 获取当前位置信息
   * @author joyxin
   */
  getLocation({ state, commit }) {
    const geolocation = state.geolocation

    return new Promise((resolve, reject) => {
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          commit('SET_POSITION', result.position)

          const { lng, lat } = result.position
          resolve([lng, lat])
        } else {
          reject(result)
        }
      })
    })
  },

  /**
   * 添加地图控件插件
   * @author joyxin
   */
  addToolbarPlugin({ state, commit }) {
    const { AMap, map } = state

    AMap.plugin('AMap.ToolBar', () => {
      // // 缩放工具条实例化
      const toolbar = new AMap.ToolBar({
        position: 'RT',
        offset: [20, 120]
      })

      map.addControl(toolbar)

      toolbar.addTo(map)

      commit('SET_TOOLBAR', toolbar)
    })
  },

  /**
   * 缩放工具展示
   */
  showToolbar({ state }) {
    state.toolbar.show()
  },
  hideToolbar({ state }) {
    state.toolbar.hide()
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}