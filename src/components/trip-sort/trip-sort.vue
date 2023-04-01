<script>
export default {
  name: 'TripSort',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: Array,
      default: () => {
        return []
      }
    },
    contentIcon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: '#d6a266'
    }
  }
}
</script>

<template>
  <div class="lvyou-trip-sort">
    <view class="lvyou-trip-sort__name">{{ title }}</view>
    <view class="lvyou-trip-sort__content">
      <view
        v-for="(item, index) in content"
        :key="index"
        class="lvyou-trip-sort__item"
      >
        <u-icon v-if="contentIcon" class="lvyou-trip-sort__icon" :name="contentIcon" :color="iconColor" />
        {{ item }}
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
@include b(trip-sort) {
  margin-bottom: 50rpx;

  @include e(name) {
    margin-bottom: 16rpx;

    font-size: 14px;
    font-weight: 600;
    color: rgb(245, 234, 221);
  }

  @include e(content) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @include e(item) {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 16rpx;
    margin-bottom: 16rpx;
    padding: 16rpx 24rpx;
    border-radius: 8px;

    font-size: 8px;
    letter-spacing: 0.1em;
    background: rgb(65, 95, 95);
    color: rgb(245, 234, 221);
  }

  @include e(icon) {
    margin-right: 10rpx;
  }
}
</style>
