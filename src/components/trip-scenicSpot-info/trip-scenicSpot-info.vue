<script>
export default {
  name: 'TripScenicSpotInfo',
  props: {
    name: {
      type: String,
      default: '婆罗浮屠寺'
    },
    nameStyle: {
      type: [Object, String],
      default: function () {
        return { fontSize: '25px', marginBottom: '30rpx' }
      }
    },
    address: {
      type: String,
      default: '印度尼西亚，马格兰'
    }
  },
  methods: {
    str2Obj(target) {
      if (typeof target !== 'string') return target

      return JSON.parse(target)
    }
  }
}
</script>

<template>
  <view class="lvyou-scenicSpot-item__description">
    <slot />
    <p class="name" :style="nameStyle">{{ name }}</p>
    <view class="country">
      <image src="@/static/country/Indonesia.png" class="country__icon" />
      <p class="country__name">{{ address }}</p>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@include b(scenicSpot-item) {
  @include e(description) {
    .name {
      font-weight: 700;
      color: rgb(245, 234, 221);
    }

    .country {
      display: flex;
      flex-direction: row;

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
}
</style>
