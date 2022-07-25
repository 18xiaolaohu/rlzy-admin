import request from '@/utils/request'

// 获取员工列表
export const getEmployee = ({ page, size }) => {
  return request({
    url: '/sys/user',
    params: { page, size }
  })
}

// 批量导入员工
export const importEmployee = data => {
  return request({
    method: 'POST',
    url: '/sys/user/batch',
    data
  })
}

// 删除员工
export const delEmployee = id => {
  return request({
    method: 'DELETE',
    url: `/sys/user/${id}`
  })
}

// 给员工分配角色
export const assignRoles = ({ id, roleIds }) => {
  return request({
    method: 'PUT',
    url: '/sys/user/assignRoles',
    data: { id, roleIds }
  })
}
