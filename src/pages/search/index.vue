<script>
export default {
  name: 'Search',
  data() {
    return {
      attractionList: [],
      show: false,
      priceSlider: 0,
      minPrice: 100,
      maxPrice: 3000
    }
  },
  onReady() {
    this.$store.dispatch('attractions/getAttractionList').then(
      res => {
        this.attractionList = res
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    open() {
      // console.log('open');
      console.log('open')
    },
    close() {
      this.show = false
      // console.log('close');
    },
    handleFilterIconClick() {
      console.log('handleFilterIconClick')
      this.show = true
    }
  }
}
</script>

<template>
  <div class="lvyou-search-container">
    <trip-navbar :is-tab-bar-page="false" title="搜索景区" />

    <div class="lvyou-search-container__search lvyou-search-bar">
      <u-search
        bg-color="#1b3232"
        height="88rpx"
        search-icon=""
        :action-style="{display: 'none'}"
        class="lvyou-search-bar__input"
      />

      <div class="lvyou-search-bar__icon">
        <u-icon name="search" size="20" color="#244444" />
      </div>
    </div>

    <div class="lvyou-search-container__filter lvyou-search-filter">
      <div class="lvyou-search-filter__result">发现 {{ attractionList.length }} 景区</div>

      <div class="lvyou-search-filter__filter" @click="handleFilterIconClick">
        <u-icon name="list-dot" />
      </div>

      <view class="lvyou-search-filter__popup lvyou-search-popup">
        <u-popup
          :show="show"
          mode="bottom"
          bg-color="rgb(36, 68, 68)"
          :custom-style="{padding: '50rpx 40rpx', margin: '0 24rpx 50rpx', borderRadius: '60rpx'}"
          @close="close"
          @open="open"
        >
          <view class="lvyou-search-popup__list">
            <trip-sort title="展示" :content="['横向卡片', '纵向卡片']" />

            <trip-sort title="位置" :content="['省份', '城市']" />

            <view class="lvyou-search-popup__sort lvyou-popup-sort">
              <view class="lvyou-popup-sort__name">价格</view>
              <view class="lvyou-popup-sort__content">
                <!-- TODO： 这里需要修改，暂时不知道怎么做，甩手先不干了 -->
                <u-slider
                  v-model="priceSlider"
                  :min="100"
                  :max="300"
                />
              </view>
            </view>

            <trip-sort title="评分" :content="['ALL', '5', '4', '3', '2', '1', '无评分']" content-icon="star-fill" />

            <trip-sort title="范围" :content="['0+ km', '5+ km', '15+ km', '30+ km', '50+ km']" />
          </view>

          <u-button class="lvyou-search-filter__confirm" color="#D6A266">确认搜索</u-button>
        </u-popup>
      </view>
    </div>

    <div class="lvyou-search-container__list lvyou-search-list">
      <trip-scenicSpot-card
        v-for="(item, index) in attractionList"
        :key="index"
        class="lvyou-search-list__item"
        width="690rpx"
        height="340rpx"
        mode="navigation"
        content-display="flex"
        :info="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(search-container) {
  min-height: 100vh;
  background-color: $uni-bg-color;
}

@include b(search-bar) {
  display: flex;
  flex-direction: row;
  padding: 40rpx 13px;

  @include e(input) {
    border-bottom: 1px solid rgba(65, 95, 95, 0.8);
  }

  @include e(icon) {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 88rpx;
    height: 88rpx;
    background-color: rgb(214, 162, 102);
    border-radius: 13px;
  }
}

@include b(search-filter) {
  display: flex;
  flex-direction: row;

  padding: 0 13px;

  @include e(result) {
    flex-grow: 1;
    display: flex;
    align-items: center;

    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: rgb(245, 234, 221);
  }

  @include e(filter) {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 88rpx;
    height: 33px;
    border-radius: 11px;
    background: rgb(36, 68, 68);

    border: 1px solid rgb(65, 95, 95);
  }
}

/* lvyou-search-filter__popup */
@include b(search-popup) {

}

/* lvyou-search-popup__sort */
@include b(popup-sort) {
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
  }

  @include e(item) {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 16rpx 24rpx;
    border-radius: 8px;

    font-size: 8px;
    letter-spacing: 0.1em;
    background: rgb(65, 95, 95);
    color: rgb(245, 234, 221);

    &:not(:first-child) {
      margin-left: 16rpx;
    }
  }
}

@include b(search-list) {
  @include e(item) {
    margin-bottom: 30rpx;
  }
}
</style>
