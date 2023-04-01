<!-- eslint-disable no-undef -->
<script>
import { validEmail, validPhone } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateAccount = (rule, value, callback) => {
      if (!(validEmail(value) || validPhone(value))) {
        callback(new Error('请输入正确账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        if (this.passwordErrMsg) {
          callback(new Error(this.passwordErrMsg))
          this.passwordErrMsg = ''
        } else {
          callback(new Error('密码长度不能小于 6 位'))
        }
      } else {
        callback()
      }
    }

    return {
      form: {
        account: '18674886614',
        password: 'ea'
      },
      rules: {
        account: [
          {
            required: true,
            validator: validateAccount,
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: ['change', 'blur']
          }
        ]
      },
      type: 'password',
      passwordIcon: true,
      passwordErrMsg: '',
      loginFormItemStyle: {
        marginBottom: '40rpx'
      },
      buttonStyle: {
        borderRadius: '23px',
        height: '60px'
      },
      buttonScanStyle: {
        width: '60px',
        marginLeft: '30rpx'
      },
      loginButtonStyle: {
        backgroundColor: '#D6A266'
      },
      inputFontSize: '14px'
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    handleLogin() {
      this.$refs.uForm.validate().then(
        valid => {
          const info = { phone: this.form.account, password: this.form.password }
          this.$store.dispatch('user/login', info).then(
            res => {
              console.log('登录成功', res)
              uni.switchTab({
                url: '/pages/tabbar/home/index'
              })
            },
            err => {
              console.log('login (handleLogin): ', err)
              if (err === '密码错误!') {
                this.form.password = ''
                this.passwordErrMsg = err
              }
            }
          )
        },
        error => {
          console.log('账号信息填写错误: ', error)
        }
      )
    },
    handleRegsiter() {
      uni.navigateTo({
        url: './register'
      })
    }
  }
}
</script>

<template>
  <view class="lvyou-login-container">
    <div class="lvyou-login-container__bg">
      <div class="bg-top">
        <image class="bg" src="@/static/images/login/login-bg.png" mode="widthFix" />
      </div>
      <div class="bg-bottom" />
    </div>

    <div class="lvyou-login-container__content">
      <h1 class="title">登录</h1>

      <u-form ref="uForm" class="login-form" :model="form" label-position="top" label-width="auto">

        <u-form-item class="login-form-item" prop="account">
          <u-input v-model="form.account" placeholder="手机号/邮箱" border="bottom" :custom-style="loginFormItemStyle" color="#fff" />
        </u-form-item>

        <u-form-item class="login-form-item" prop="password">
          <u-input v-model="form.password" placeholder="密码" type="password" :password-icon="false" border="bottom" :custom-style="loginFormItemStyle" color="#fff" />
        </u-form-item>

        <view class="login-form-box" style="display: flex; marginBottom: '40rpx'">
          <u-button class="login-form-item login-form__button" type="primary" color="#244444" :custom-style="{...loginFormItemStyle, ...buttonStyle, ...loginButtonStyle}" @click.native.prevent="handleLogin">登录</u-button>

          <u-button class="login-form-item button-scan" icon="scan" color="#244444" :custom-style="{...buttonStyle, ...buttonScanStyle}" />
        </view>
      </u-form>

      <u-button class="register-button" :custom-style="{...loginFormItemStyle, ...buttonStyle}" type="primary" color="#244444" @click.native.prevent="handleRegsiter">注册</u-button>
    </div>
  </view>
</template>

<style lang="scss" scoped>
@include b(login-container) {
  display: flex;
  flex-direction: column-reverse;

  // 元素占满全屏
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  padding: 0 32rpx;
  overflow:hidden;
  padding-top: 30px;

  // overflow: hidden;

  @include e(bg) {
    .bg-top {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;

      .bg {
        width: 100%;
      }
    }

    .bg-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 356rpx;
      z-index: -1 ;
      background: linear-gradient(0deg, rgba(27, 50, 50, 1) 75.8%, rgba(27, 50, 50, 0) 100%);
    }
  }

  @include e(content) {

    .login-form {
      flex: 1;
      position: relative;
    }

    .title {
      font-size: 25px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 80rpx;
    }
  }
}
</style>
