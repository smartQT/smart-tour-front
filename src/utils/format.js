/**
 * 对参数进行格式化，如果传入参数不是长度单位，自动进行携带单位
 * @author joyxin
 * @param {string | number} 携带或没有携带单位的参数
 * @returns 携带单位的值
 */
export function formatLengthUnit(val) {
  if (!val) return undefined

  val = val + '' // 将传入参数转换为 string

  const targetArr = ['px', 'rpx', 'vw', 'vh', 'rem', 'em']

  for (const target of targetArr) {
    if (val.includes(target)) {
      return val
    }
  }

  // 如果传入参数没有携带单位值，则手动添加 'px'
  return val + 'px'
}

/**
 * 将 obj类型的 style 转换为 str
 * @author joyxin
 * @param { object } obj类型的 style
 * @returns 转换后的值
 */
export function styleObj2str(target) {
  if (typeof target !== 'object') {
    return target
  }

  return Object.keys(target).map(key => `${key}:${target[key]}`).join(';')
}