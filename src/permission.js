import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 白名单
const whiteList = ['/login', '/404']
// to 去哪 from 来自哪里 next 放行
// 前置路由守卫
router.beforeEach((to, from, next) => {
  // 开始进度效果
  NProgress.start()
  // 控制权限
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      if (!store.state.user.userInfo.id) {
        // 这里ajax只会发送一次，优化一下
        // 当用户手里面有token并且访问的不是登录页面，那就应该请求个人资料
        store.dispatch('user/getInfo')
      }
      // store.dispatch('user/getInfo')
      next() // 放行
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
// 后置路由守卫
router.afterEach(() => {
  // 结束进度效果
  NProgress.done()
})
