<script>
export default {
  name: 'TripNavbar',
  props: {
    isTabBarPage: {
      type: Boolean,
      default: true
    },
    showNavBar: {
      type: Boolean,
      default: true
    },
    bgColor: {
      type: String,
      default: 'rgba(27, 50, 50, 1)'
    },
    leftIconColor: {
      type: String,
      default: '#fff'
    },
    title: {
      type: String,
      default: ''
    },
    titleStyle: {
      type: [String, Object],
      default: () => {
        return {
          color: '#fff'
        }
      }
    }
  }
}
</script>

<template>
  <u-navbar auto-back :left-icon-color="leftIconColor" placeholder :bg-color="bgColor" :title="title" :title-style="titleStyle">
    <template v-if="isTabBarPage" #left>
      <slot name="left">
        <div v-if="showNavBar" class="user">
          <image class="user__pic" src="@/static/head-portrait/head-portrait_1.png" />
          <div class="user__info">
            <div class="info-welcome">Welcome</div>
            <div class="info-name">Evelyn</div>
          </div>
        </div>
        <div v-else />
      </slot>
    </template>
  </u-navbar>
</template>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: row;
  height: 40px;

  .user__pic {
    margin: auto 0;
    margin-right: 9px;
    width: 40px;
    height: 40px;

    border-radius: 13px;
  }

  .user__info {
    margin: auto 0;

    .info-welcome {
      height: 10px;
      opacity: 0.8;
      /** 文本 */
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0px;
      color: rgba(177, 166, 153, 1);
      text-align: left;
      vertical-align: top;
    }

    .info-name {
      height: 17px;
      opacity: 0.8;
      /** 文本 */
      font-size: 16px;
      font-weight: 700;
      color: rgba(245, 234, 221, 1);
      text-align: left;
      vertical-align: bottom;
    }
  }
}
</style>
