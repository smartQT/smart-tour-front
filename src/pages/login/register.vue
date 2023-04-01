<script>
import { validEmail, validPhone } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不能小于 6 位'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        if (this.codeErrMsg) {
          callback(new Error(this.codeErrMsg))
          this.codeErrMsg = ''
        } else {
          callback(new Error('验证码格式错误'))
        }
      } else {
        callback()
      }
    }

    return {
      form: {
        phone: '19830441067',
        password: '111111',
        email: '1372137936@qq.com',
        code: '111111'
      },
      rules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      type: 'password',
      passwordIcon: true,
      codeErrMsg: '',
      registerButtonStyle: {
        height: '60px',
        backgroundColor: '#D6A266',
        border: 'none',
        borderRadius: '23px'
      },
      registerEmailButtonStyle: {
        backgroundColor: '#244444',
        flexGrow: '1',
        border: 'none',
        borderRadius: '10px'
      }
    }
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    handleRegister() {
      this.$refs.uForm.validate().then(valid => {
        if (!valid) {
          console.log('提交错误')
          return false
        }

        this.$store.dispatch('user/register', this.form).then(
          res => {
            console.log('注册成功: ', res)
            uni.navigateTo({
              url: 'index'
            })
          },
          err => {
            console.log('注册失败: ', err)
            if (err === '验证码错误') {
              this.form.code = ''
              this.codeErrMsg = err
              this.$refs.uForm.validate().catch(err => {
                console.log(err)
              })
            }
          }
        )
      }).catch(error => {
        console.log(error)
      })
    },
    handleRegisterEmail() {
      this.$refs.uForm.validate().then(valid => {
        this.$store.dispatch('user/registerEmail', this.form.email)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<template>
  <view class="lvyou-register">
    <div class="lvyou-register__bg">
      <image class="bg-top" src="@/static/images/login/register-bg.png" mode="widthFix" />
      <div class="bg-bottom" />
    </div>

    <div class="lvyou-register__content">
      <h2 class="lvyou-title">
        注册账号
      </h2>

      <u-form ref="uForm" class="lvyou-form" :model="form" label-position="top" label-width="auto">
        <u-form-item class="lvyou-form__item" prop="phone">
          <u-input v-model="form.phone" :custom-style="{borderColor: '#415f5f !important'}" color="rgba(255, 255, 255, .7)" placeholder-style="color: '#415f5f'" border="bottom" placeholder="手机号" />
        </u-form-item>

        <u-form-item class="lvyou-form__item" prop="password">
          <u-input v-model="form.password" :custom-style="{borderColor: '#415f5f !important'}" color="rgba(255, 255, 255, .7)" placeholder-style="color: '#415f5f'" border="bottom" placeholder="密码" type="password" :password-icon="false" />
        </u-form-item>

        <u-form-item class="lvyou-form__item lvyou-form-email" prop="email">
          <u-input v-model="form.email" :custom-style="{borderColor: '#415f5f !important'}" color="rgba(255, 255, 255, .7)" placeholder-style="color: '#415f5f'" border="bottom" class="lvyou-form-email__input" placeholder="邮箱" />

          <template #right>
            <u-button type="success" :custom-style="registerEmailButtonStyle" @click.native.prevent="handleRegisterEmail">发送验证码</u-button>
          </template>
        </u-form-item>

        <u-form-item class="lvyou-form__item" prop="code">
          <u-input v-model="form.code" :custom-style="{borderColor: '#415f5f !important'}" color="rgba(255, 255, 255, .7)" placeholder-style="color: '#415f5f'" border="bottom" placeholder="验证码" />
        </u-form-item>
        <u-button class="lvyou-form__button" type="primary" :custom-style="registerButtonStyle" :hairline="false" @click.native.prevent="handleRegister">注册</u-button>
      </u-form>
    </div>
  </view>
</template>

<style lang="scss" scoped>
@include b(register) {
  margin: 0 32rpx;
  // height: 100vh;
  overflow:hidden;
  padding-top: 30px;
  // display: flex;
  // flex-direction: column;

  @include e(bg) {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .bg-top {
      width: 100vw;
      height: 100%;
    }

    .bg-bottom {
      position: absolute;
      bottom: 0;
      top: 356rpx;

      width: 100vw;
      background: linear-gradient(0, rgba(27, 50, 50, 1) 75.8%, rgba(27, 50, 50, 0) 100%);
    }
  }

  @include e(content) {
    position: absolute;
    bottom: 60rpx;
    left: 60rpx;
    right: 60rpx;
  }
}

@include b(title) {
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 80rpx;
  color: #fff;
}

@include b(form) {
  display: flex;
  flex-direction: column;

  @include e(item) {
    margin-bottom: 20rpx;
  }
}
</style>
