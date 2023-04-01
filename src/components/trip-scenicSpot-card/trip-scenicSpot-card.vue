<script>
import format from '@/mixins/format'
import style from './style'
import props from './props'

export default {
  name: 'TripScenicSpotCard',
  mixins: [style, props, format],
  methods: {
    handleLinkClick() {
      this.$emit('navigato', [this.info.x, this.info.y])
    }
  }
}
</script>

<template>
  <div class="lvyou-scenicSpot-card" :style="cardStyle">
    <image style="width: 100%; height: 100%;" class="lvyou-scenicSpot-card__cover" mode="aspectFill" :src="info.images" />

    <view class="lvyou-scenicSpot-card__header" :style="cardHeaderStyle">
      <trip-scenicSpot-score :custom-style="scroeStyle" />
      <view class="lvyou-scenicSpot-card__collect">
        <u-icon name="bookmark-fill" color="#e8b171" size="22px" />
      </view>
    </view>

    <view class="lvyou-scenicSpot-card__content" :style="cardContentStyle">
      <trip-scenicSpot-info
        :name-style="contentNameSize"
        :name="info.name"
        :address="info.address"
      >
        <p class="recommend">推荐景点</p>
      </trip-scenicSpot-info>

      <view
        class="lvyou-scenicSpot-card__link"
        :style="cardLinkStyle"
        @click="handleLinkClick"
      >
        <u-icon
          name="arrow-rightward"
          color="#d6a266"
          size="18"
          class="icon"
          :style="linkIconStyle"
        />
      </view>
    </view>
  </div>
</template>

<style lang="scss" scoped>
@import './trip-scenicSpot-card.scss';
</style>
