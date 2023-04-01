export default {
  props: {
    width: {
      type: String,
      default: '530rpx'
    },
    height: {
      type: String,
      default: '1068rpx'
    },
    contentDisplay: { // 元素的 display
      type: String,
      default: 'block'
    },
    mode: {
      type: String,
      default: 'home'
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}