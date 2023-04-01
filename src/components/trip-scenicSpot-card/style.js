import { formatLengthUnit, styleObj2str } from '@/utils/format'

export default {
  computed: {
    cardStyle() {
      const styleObj = {
        width: formatLengthUnit(this.width),
        height: formatLengthUnit(this.height)
      }
      return styleObj2str(styleObj)
    },
    cardHeaderStyle() {
      let styleObj

      switch (this.mode) {
        case 'home':
          styleObj = { top: '50rpx', left: '50rpx', right: '50rpx' }
          break
        case 'navigation':
          styleObj = { top: '28rpx', left: '28rpx', right: '28rpx' }
          break
      }

      return styleObj2str(styleObj)
    },
    cardContentStyle() {
      let bottom

      switch (this.mode) {
        case 'home':
          bottom = '50rpx'
          break
        case 'navigation':
          bottom = '28rpx'
          break
      }

      const styleObj = {
        display: this.contentDisplay,
        justifyContent: 'space-between',
        bottom
      }

      return styleObj2str(styleObj)
    },
    contentNameSize() {
      let styleObj

      switch (this.mode) {
        case 'home':
          styleObj = { fontSize: '25px', marginBottom: '30rpx' }
          break
        case 'navigation':
          styleObj = { fontSize: '16px', marginBottom: '10rpx' }
          break
      }

      return styleObj2str(styleObj)
    },
    cardLinkStyle() {
      let styleObj

      switch (this.mode) {
        case 'home':
          styleObj = {
            display: 'flex',
            flexDirection: 'row-reverse',
            marginTop: '50rpx'
          }
          break
        case 'navigation':
          styleObj = {
            display: 'flex',
            flexDirection: 'column-reverse',
            marginTop: '0'
          }
          break
      }

      return styleObj2str(styleObj)
    },
    scroeStyle() {
      const styleObj = {
        width: 0,
        height: 0
      }

      switch (this.mode) {
        case 'home':
          styleObj.width = '156rpx'
          styleObj.height = '70rpx'
          break
        case 'navigation':
          styleObj.width = '80rpx'
          styleObj.height = '40rpx'
          break
      }

      return styleObj2str(styleObj)
    },
    linkIconStyle() {
      const styleObj = {
        width: '24rpx',
        height: '16rpx',
        borderRadius: '15px',
        background: 'rgba(214, 162, 102, 0.25)'
      }

      switch (this.mode) {
        case 'home':
          styleObj['padding'] = '38rpx 62rpx'
          break
        case 'navigation':
          styleObj['padding'] = '28rpx 44rpx'
          break
      }

      return styleObj2str(styleObj)
    }
  }
}