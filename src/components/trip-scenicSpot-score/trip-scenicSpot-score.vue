<script>
import format from '@/mixins/format'

export default {
  name: 'TripScenicSpotScore',
  mixins: [format],
  props: {
    customStyle: {
      type: [String, Object],
      default: () => {
        return {
          width: '156rpx',
          height: '70rpx'
        }
      }
    }
  }
}
</script>

<template>
  <view class="lvyou-scenicSpot-item__score" :style="customStyle">
    <u-icon name="star-fill" color="#e8b171" size="14px" />
    <text class="lvyou-scenicSpot-item__score--count">4.9</text>
  </view>
</template>

<style lang="scss" scoped>
@include b(scenicSpot-item) {
  @include e(score) {
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
}
</style>
