<script>
export default {
  name: 'Collect',
  data() {
    return {
      keyword: ''
    }
  }
}
</script>

<template>
  <div class="lvyou-collect-container">
    <trip-navbar class="lvyou-collect-container__header">
      <template #left>
        <h1 class="title">收藏夹</h1>
      </template>
    </trip-navbar>

    <div class="lvyou-collect-container__bg" />

    <u-search v-model="keyword" placeholder="搜索收藏夹的景点" bg-color="transparent" action-text="搜索" show-action :action-style="{color: '#909399'}" @click.native.prevent="handleToSearchPage" />

    <u-divider />

    <u2-scroll-list class="lvyou-scenicSpot-list" :indicator="false">
      <view v-for="index in 6" :key="index" class="lvyou-scenicSpot-item" @click="turnToDestination">
        <trip-scenicSpot-card />
      </view>
    </u2-scroll-list>
  </div>
</template>

<style lang="scss" scoped>
@include b(collect-container) {

  @include e(header) {
    .title {
      font-size: 20px;
      font-weight: 700;
      color: rgba(214, 162, 102, 1);
    }
  }

  @include e(bg) {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: $uni-bg-color;
  }
}
</style>
