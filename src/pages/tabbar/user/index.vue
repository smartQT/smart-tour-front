<script>
export default {
  name: 'User',
  data() {
    return {
      bgColor: '#1b3232'
    }
  }
}
</script>

<template>
  <div class="lvyou-user-container">
    <u-navbar auto-back placeholder :bg-color="bgColor" :height="0" />

    <div class="lvyou-user-container__bg" />

    <div class="lvyou-user-container__header">
      <image class="user__pic" src="@/static/head-portrait/head-portrait_1.png" />
      <div class="user__info">
        <div class="info-name">Evelyn</div>
        <div class="info-position">
          <image src="@/static/country/Indonesia.png" class="position__icon" />
          <p class="position__name">印度尼西亚，马格兰</p>
        </div>
      </div>
    </div>

    <div class="lvyou-user-container__content">
      <div class="link is-active">
        <p class="link-title">
          Your Profile
        </p>
        <div class="link-icon-box">
          <div class="link-icon">
            <u-icon class="link-icon" name="arrow-right" color="#1b3232" />
          </div>
        </div>
      </div>

      <div class="link">
        <p class="link-title">
          Your Profile
        </p>
        <div class="link-icon-box">
          <div class="link-icon">
            <u-icon class="link-icon" name="arrow-right" color="#1b3232" />
          </div>
        </div>
      </div>
      <div class="link">
        <p class="link-title">
          Your Profile
        </p>
        <div class="link-icon-box">
          <div class="link-icon">
            <u-icon class="link-icon" name="arrow-right" color="#1b3232" />
          </div>
        </div>
      </div>
      <div class="link">
        <p class="link-title">
          Your Profile
        </p>
        <div class="link-icon-box">
          <div class="link-icon">
            <u-icon class="link-icon" name="arrow-right" color="#1b3232" />
          </div>
        </div>
      </div>
      <div class="link">
        <p class="link-title">
          Your Profile
        </p>
        <div class="link-icon-box">
          <div class="link-icon">
            <u-icon class="link-icon" name="arrow-right" color="#1b3232" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@include b(user-container) {
  padding: 0 30px;

  @include e(bg) {
    position: fixed;
    z-index: -1;
    left: 0;

    width: 100vw;
    height: 100vh;

    background-color: $uni-bg-color;
  }

  @include e(header) {
    display: flex;
    flex-direction: row;
    margin-top: 60rpx;

    .user__pic {
      width: 80px;
      height: 80px;
      border-radius: 23px;
      margin-right: 32rpx;
    }

    .user__info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .info-name {
        font-size: 20px;
        font-weight: 700;
        color: rgb(245, 234, 221);
      }

      .info-position {
        display: flex;
        flex-direction: row;

        .position__icon {
          width: 13px;
          height: 13px;
          border-radius: 5px;
          margin-right: 5px;
        }

        .position__name {
          font-size: 10px;
          font-weight: 600;
          color: rgb(177, 166, 153);
        }
      }
    }
  }

  @include e(content) {
    .link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      margin-top: 25px;
      width: 315px;
      height: 64px;
      border-radius: 15px;
      background: rgba(36, 68, 68, 1);

      .link-title {
        margin-left: 50rpx;
        font-size: 14px;
        font-weight: 600;
        color: rgb(177, 166, 153);
      }

      .link-icon-box {
        margin-right: 20rpx;
      }

      .link-icon {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        height: 40px;
        border-radius: 13px;
        background: rgb(65, 95, 95);
      }
    }
  }
}
</style>
