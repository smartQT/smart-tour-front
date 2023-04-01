<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navigation',
  data() {
    return {
      showPopup: false,
      showCardList: true,
      isRoutePlanning: false,
      attractionList: []
    }
  },
  methods: {
    ...mapActions('map', {
      routePlanning: 'routePlanning',
      stopRoutePlanning: 'stopRoutePlanning',
      hideToolbar: 'hideToolbar',
      showToolbar: 'showToolbar',
      setMapZoomAndCenter: 'setZoomAndCenter'
    }),
    open() {
      // 隐藏地图控件
      this.hideToolbar()
    },
    close() {
      this.showPopup = false

      // 显示地图控件
      this.showToolbar()
    },
    navigato(position) {
      this.routePlanning({ mode: 'driving', point: position }).then(
        res => {
          this.showPopup = false
          this.showCardList = false
          this.isRoutePlanning = true
        },
        err => {
          console.log(err)
        }
      )
    },
    handleSearchIconClick() {
      this.showPopup = true
    },
    handleStopPlanClick() {
      // 清楚导航路线
      this.stopRoutePlanning()
      this.setMapZoomAndCenter()

      this.showCardList = true
      this.isRoutePlanning = false
    }
  },
  onReady() {
    this.$store.dispatch('attractions/getAttractionList', 1).then(
      res => {
        this.attractionList = res
        console.log(this.attractionList)
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>

<template>
  <view class="navigation lvyou-navigation">
    <!-- 模拟导航栏，仅占位 -->
    <trip-navbar bg-color="transparent" :show-nav-bar="false" />

    <div v-show="!showPopup" class="lvyou-navigation-header">
      <p class="lvyou-navigation-header__title">附近景点</p>

      <view class="lvyou-navigation-header__search">
        <u-icon name="search" size="28px" color="#d6a266" @click="handleSearchIconClick" />
      </view>
    </div>

    <!-- 弹出层 -->
    <u-popup
      mode="top"
      :show="showPopup"
      class="lvyou-navigation-popup"
      bg-color="transparent"
      overlay-style="linear-gradient(180deg, rgba(27, 50, 50, 1) 33.26%, rgba(27, 50, 50, 0) 63.88%)"
      @close="close"
      @open="open"
    >
      <!-- 模拟导航栏，仅占位 -->
      <trip-navbar bg-color="transparent" :show-nav-bar="false" />

      <div class="lvyou-navigation-popup__search">\
        <u-search
          placeholder="Search your dream destination"
          class="search"
          bg-color="transparent"
          placeholder-color="#415f5f"
          :input-style="{borderBottom: '1px solid rgba(65, 95, 95, 0.8)'}"
          :show-action="false"
          search-icon=""
        />
        <div class="icon">
          <u-icon name="search" color="#000" size="28" />
        </div>
      </div>

      <u2-scroll-list class="lvyou-navigation-popup__list" :indicator="false">
        <view>
          <view class="lvyou-navigation-list__occupy" />
        </view>

        <view v-for="index in 5" :key="index" style="display: flex;">
          <trip-scenicSpot-card width="530rpx" height="135px" content-display="flex" mode="navigation" @navigato="navigato" />
        </view>

        <view>
          <view class="lvyou-navigation-list__occupy" />
        </view>
      </u2-scroll-list>
    </u-popup>

    <!-- 地图 -->
    <trip-map class="lvyou-navigation-map" />

    <transition name="list">
      <u2-scroll-list v-show="!showPopup && showCardList" class="lvyou-navigation-list" :indicator="false">
        <view class="lvyou-navigation-bg" />

        <view>
          <view class="lvyou-navigation-list__occupy" />
        </view>

        <view v-for="(item, index) in attractionList" :key="index" style="display: flex;">
          <trip-scenicSpot-card width="530rpx" height="135px" content-display="flex" mode="navigation" :info="item" @navigato="navigato" />
        </view>

        <view>
          <view class="lvyou-navigation-list__occupy" />
        </view>
      </u2-scroll-list>
    </transition>

    <transition name="list">
      <div v-show="isRoutePlanning" class="lvyou-route-planning">
        <div class="lvyou-route-planning__container" @click="handleStopPlanClick">
          <u-icon name="arrow-down-fill" class="icon" color="#f5eadd" />
          停止路线导航
        </div>
      </div>
    </transition>

  </view>
</template>

<style lang="scss" scoped>
@include b(navigation-header) {
  position: relative;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @include e(title) {
    display: flex;
    flex-direction: column-reverse;
    margin-left: 60rpx;
    font-size: 22px;
    font-weight: 600;
    color: rgba(245, 234, 221, 1);
  }

  @include e(search) {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 44rpx;
    margin-top: 44rpx;
  }
}

@include b(navigation-popup) {

  @include e(search) {
    display: flex;
    flex-direction: row;

    padding-right: 60rpx;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90rpx;
      height: 90rpx;
      border-radius: 13px;
      background: rgba(214, 162, 102, 1);
    }
  }

  @include e(list) {
    margin-top: 40rpx;
  }
}

@include b(navigation-list) {
  position: absolute;
  bottom: 30px;
  z-index: 1;

  padding-bottom: 0;

  width: 100vw;
  overflow-x: auto;

  @include e(occupy) {
    width: 48rpx;
    height: 135px;
  }
}

@include b(navigation-bg) {
  position: fixed;
  z-index: -1;
  left: 0;
  right: 0;
  /* ifdef H5 */
  bottom: 50px;
  /* endif */
  height: 30px + 135px;
  background: linear-gradient(0, #1b3232 60%, rgba(27, 50, 50, 0.6));
}

@include b(navigation-item) {
  position: relative;
  z-index: 1;

  width: 530rpx;
  height: 135px;
  border-radius: 23px;
  overflow: hidden;
  margin-right: 24rpx;

  @include e(bg) {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;

    width: 100%;
    height: 100%;
  }
}

@include b(route-planning) {
  position: absolute;
  bottom: 100rpx;
  z-index: 1;

  width: 100%;
  height: 80rpx;

  @include e(container) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;

    border-radius: 13px;
    width: 320rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: rgb(214, 162, 102);
    margin: 0 auto;

    font-size: 12px;
    font-weight: 600;
    color: #f5eadd;

    .icon {
      margin-right: 20rpx;
    }
  }
}
</style>

<style lang="scss" scoped>
.list-enter-active, .list-leave-active {
  transition: all .5s;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>