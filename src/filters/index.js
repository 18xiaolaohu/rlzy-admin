// 批量过滤器
// 时间过滤器
import dayjs from 'dayjs'
// Vue.filter('dateformat', function (time) {
//   return dayjs(time).format('YYYY-MM-DD')
// })

export const dateformat = function (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
