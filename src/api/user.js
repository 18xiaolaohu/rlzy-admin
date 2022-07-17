import request from '@/utils/request'

export function login (data) {
  return request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

/**
 * 获取用户个人资料
 * @returns
 */
export function getInfo () {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 获取用户的基本信息 现在写完完全是为了显示头像
 * @returns
 */
export function getUserDetailById (id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout () {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'POST'
  })
}

// 获取简单列表
export const getSimpleUserList = () => {
  return request({
    url: '/sys/user/simple'
  })
}

