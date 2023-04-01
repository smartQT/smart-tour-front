<script>
export default {
  name: 'Home',
  data() {
    return {
      keyword: '',
      attractionList: []
    }
  },
  methods: {
    handleToSearchPage() {
      // TODO：跳转到 搜索 页面
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    turnToDestination() {
      uni.navigateTo({
        url: '/pages/destination/index'
      })
    }
  },
  onReady() {
    this.$store.dispatch('attractions/getAttractionList', 1).then(
      res => {
        this.attractionList = res
      },
      err => {
        console.log(err)
      }
    )
  }
}
</script>

<template>
  <view class="home-container">
    <trip-navbar />

    <u-search
      v-model="keyword"
      placeholder="搜索附近热门景点"
      bg-color="transparent"
      action-text="搜索"
      show-action
      :disabled="true"
      :action-style="{color: '#909399'}"
      @click.native.prevent="handleToSearchPage"
    />

    <u-divider />

    <u2-scroll-list class="lvyou-scenicSpot-list" :indicator="false">
      <view v-for="(item, index) in attractionList" :key="index" class="lvyou-scenicSpot-item" @click="turnToDestination">
        <trip-scenicSpot-card :info="item" />
      </view>
    </u2-scroll-list>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  background-color: $lvyou-bg-color;
  /* #ifdef H5 */
  min-height: calc(100vh - 50px);
  /* #endif */
  /* #ifndef H5 */
  min-height: 100vh;
  /* #endif */
}

@include b(scenicSpot-item) {
  position: relative;
  margin: 24rpx;

  @include e(cover) {
    border-radius: 33px;
    box-shadow: 0px 25px 40px -7px rgba(13, 29, 29, 0.4);
  }

  @include e(header) {
    position: absolute;
    top: 50rpx;
    left: 50rpx;
    right: 50rpx;

    display: flex;
    justify-content: space-between;
  }

  @include e(score) {
    width: 156rpx;
    height: 70rpx;
    border-radius: 13px;
    background: rgba(214, 162, 102, 0.25);
    backdrop-filter: blur(6px);

    // 块级元素文字居中
    display: flex;
    align-items: center;
    justify-content: center;

    @include m(count) {
      margin-left: 8rpx;
      font-size: 14px;
      font-weight: 600;
      color: rgba(236, 180, 114, 1);
    }
  }

  @include e(collect) {
    padding: 6px 3px;
  }

  @include e(content) {
    position: absolute;
    bottom: 50rpx;
    left: 50rpx;
    right: 50rpx;

    .recommend {
      font-size: 10px;
      font-weight: 600;
      color: rgba(177, 166, 153, 1);
    }
  }

  @include e(description) {
    .recommend {
      font-size: 10px;
      font-weight: 600;
      color: rgba(177, 166, 153, 1);
    }

    .name {
      font-size: 25px;
      font-weight: 700;
      color: rgb(245, 234, 221);
    }

    .country {
      display: flex;
      flex-direction: row;
      margin-top: 30rpx;

      @include e(icon) {
        width: 13px;
        height: 13px;
        margin-right: 10rpx;
      }

      @include e(name) {
        font-size: 10px;
        font-weight: 600;
        color: rgb(177, 166, 153);
      }
    }
  }

  @include e(link) {
    margin-top: 50rpx;
    display: flex;
    flex-direction: row-reverse;

    .icon {
      padding: 38rpx 62rpx;
      border-radius: 15px;
      background: rgba(214, 162, 102, 0.25);
    }
  }
}
</style>

<style lang="scss" scoped>
// 修改 uView 中部分样式
.u-divider {
  margin: 8px 0;
}
</style>
