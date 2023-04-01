/**
 * @author joyxin
 * 获取景区列表
 */
export function getAttractionList() {
  return uni.request({
    url: '/attractions/list',
    method: 'GET',
    data: {
      areaId: 3
    }
  })
}