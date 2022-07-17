import { login, getInfo, getUserDetailById } from '@/api/user'
import { setToken, getToken, removeToken, setTime } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  setUserInfo (state, payload) {
    state.userInfo = payload
  },
  // 删除token
  removeToken (state) {
    state.token = null
    removeToken()
  },
  // 删除用户资料
  removeUserInfo (state) {
    state.userInfo = {}
  }

}
const actions = {
  async login (context, data) {
    const res = await login(data)
    context.commit('setToken', res)
    setToken(res)
    setTime(Date.now()
    )
  },
  async getInfo (context) {
    const res = await getInfo()
    const res1 = await getUserDetailById(res.userId)
    // console.log(res1)
    // console.log(res)
    context.commit('setUserInfo', { ...res, ...res1 })
  },
  logout (context) {
    context.commit('removeToken')// 不仅仅删除了vuex中的 还删除了缓存中的
    context.commit('removeUserInfo')// 删除用户信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

