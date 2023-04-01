<script>
export default {
  name: 'Destination',
  data() {
    return {
      list: [
        { name: 'History' },
        { name: 'Location' },
        { name: 'Discover' }
      ],
      activeTab: 'History',
      activeIndex: 1
    }
  },
  methods: {
    handleTabsClick({ name }) {
      this.activeTab = name
    },
    handleSlidePicClick(index) {
      this.activeIndex = index
    }
  },
  onReady() {
    console.log('发送网络请求: type: post; url: ', process.env.VUE_APP_BASE_URL + '/destination/recommend')
    uni.request({
      url: '/destination/recommend',
      method: 'post'
    }).then(res => {
      console.log('请求 /destination/recommend 成功: ', res)
    }).catch(error => {
      console.log('请求 /destination/recommend 成功: ', error)
    })
  }
}
</script>

<template>
  <view class="lvyou-destination-container">
    <trip-navbar :is-tab-bar-page="false" bg-color="transparent" />

    <view class="lvyou-destination-bgContainer">
      <image class="bg" src="@/static/images/destination/detail-01.png" mode="widthFix" />
      <image class="mask" src="@/static/images/destination/mask-01.png" mode="widthFix" />
    </view>

    <view class="lvyou-destination-content">
      <view class="lvyou-destination-content__top">
        <view class="lvyou-destination-scenery">
          <view class="lvyou-destination-scenery__info">
            <trip-scenicSpot-score />
            <trip-scenicSpot-info />
          </view>

          <view class="lvyou-destination-scenery__pic">
            <image v-for="index in 4" :key="index" class="pic-mini" :class="index === activeIndex ? 'is-active' : ''" src="@/static/images/destination/mini-01.png" mode="widthFix" @click="handleSlidePicClick(index)" />
          </view>
        </view>

        <u-tabs class="lvyou-destination-function" :list="list" line-color="#d6a266" :active-style="{color: '#d6a266'}" :inactive-style="{color: '#b1a699'}" @click="handleTabsClick" />
      </view>

      <view class="lvyou-destination-detail">
        <!-- <view class="detail-list-item">
          婆罗浮屠（Borobudur）是一座7世纪的大乘佛教寺庙，位于印度尼西亚中爪哇省马格朗县，距离蒙蒂兰镇不远。是世界上最大的佛教寺庙。寺庙由九个堆叠的平台组成，六个正方形和三个圆形，顶部有一个中央圆顶。它装饰有2,672个浮雕板和504尊佛像。中央穹顶周围有72尊佛像，每尊都坐在一座穿孔的佛塔内。
        </view> -->
        <view v-if="activeTab === 'History'" class="detail-item history">
          {{ activeTab }}
          婆罗浮屠（Borobudur）是一座7世纪的大乘佛教寺庙，位于印度尼西亚中爪哇省马格朗县，距离蒙蒂兰镇不远。是世界上最大的佛教寺庙。寺庙由九个堆叠的平台组成，六个正方形和三个圆形，顶部有一个中央圆顶。它装饰有2,672个浮雕板和504尊佛像。中央穹顶周围有72尊佛像，每尊都坐在一座穿孔的佛塔内。<a href="#" class="more">更多</a>
        </view>

        <view v-if="activeTab === 'Location'" class="detail-item location" style="height: 800rpx">
          <trip-map
            mode="widthFix"
            height="800rpx"
            :custom-style="{position: 'absoulte', top: 0, left: '-60rpx'}"
          />
        </view>

        <view v-if="activeTab === 'Discover'" class="detail-item discover">
          {{ activeTab }}
          婆罗浮屠（Borobudur）是一座7世纪的大乘佛教寺庙，位于印度尼西亚中爪哇省马格朗县，距离蒙蒂兰镇不远。是世界上最大的佛教寺庙。寺庙由九个堆叠的平台组成，六个正方形和三个圆形，顶部有一个中央圆顶。它装饰有2,672个浮雕板和504尊佛像。中央穹顶周围有72尊佛像，每尊都坐在一座穿孔的佛塔内。<a href="#" class="more">更多</a>
        </view>
      </view>

      <view class="lvyou-destination-bottom">
        <view class="lvyou-scenic-spot__price">
          <p class="price-num">￥ 120</p>
          <p class="price-date">/ 天</p>
        </view>
        <u-button size="mini" :hairline="false" class="lvyou-scenic-spot__book" text="预定" :custom-style="{width: '143px', height: '60px', borderRadius: '23px', background: '#d6a266', margin: 0}" />
      </view>
    </view>

  </view>
</template>

<style lang="scss" scoped>
@include b(destination-container) {
  background-color: $lvyou-bg-color;
}

@include b(destination-bgContainer) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  width: 100vw;
  height: 100vh;
  background-color: $lvyou-bg-color;
  overflow: hidden;

  .bg {
    width: 100%;
  }

  .mask {
    width: 100%;
    transform: translateY(-100%);
  }
}

@include b(destination-content) {
  padding: 0 60rpx;

  @include e(top) {
    position: relative;

    display: flex;
    flex-direction: column-reverse;

    height: 1200rpx;
  }
}

@include b(destination-scenery) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  order: 2;

  @include e(info) {
    margin-top: auto;
  }

  @include e(pic) {
    display: flex;
    flex-direction: column;

    .pic-mini {
      width: 120rpx;
      height: 120rpx;
      border-radius: 23px;

      &:not(:last-child) {
        margin-bottom: 26rpx;
      }

      &.is-active {
        position: relative;
        border: 4px solid #d6a266;
        left: -2px;
      }
    }
  }
}

@include b(destination-function) {
  order: 1;
}

@include b(destination-detail) {
  order: 2;
  margin-bottom: 30px;

  .detail-item {

    &.history,
    &.discover {
      position: relative;

      width: 616rpx;
      // height: 60px;
      height: 6em;
      line-height: 2em;

      font-size: 10px;
      font-weight: 400;
      color: rgb(177, 166, 153);

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      &::after {
        content: ". . .";
        position: absolute;
        right: 0;
        bottom: 0;
        padding-right: 4em;
        background: $lvyou-bg-color;
        overflow: hidden;
      }

      .more {
        position: absolute;
        top: 4em;
        right: 0;
        z-index: 1;

        display: inline-block;
        width: 3em;
        padding-left: 1em;
        background: $lvyou-bg-color;
        text-decoration: none;

        color: rgb(214, 162, 102);
      }
    }

    &.location {
      height: 700rpx;
      position: relative;
    }
  }
}

@include b(destination-bottom) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  order: 1;

  padding-bottom: 40rpx;

  @include b(scenic-spot) {
    flex-shrink: 0;
    flex-grow: 1;

    @include e(price) {
      display: flex;
      flex-direction: row;
      align-items: baseline;

      .price-num {
        margin-right: 10rpx;
        font-size: 22px;
        font-weight: 600;
        color: rgb(245, 234, 221);
      }

      .price-date {
        font-size: 10px;
        font-weight: 600;
        color: rgb(177, 166, 153);
      }
    }
  }
}

.u-button--info {
  border: none;
}
</style>
