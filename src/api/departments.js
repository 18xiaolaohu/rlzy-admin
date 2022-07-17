import request from '@/utils/request'

export const getDepartmentsList = () => {
  return request({
    url: '/company/department'
  })
}
/**
 * 根据部门id删除
 * @param {*} id
 * @returns
 */
export const delDepartment = id => {
  return request({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}

/**
 * 新增部门
 * @param code 部门编码，同级部门不可重复
 * @param introduce 介绍
 * @param manager 负责人名称
 * @param name 部门名称
 * @param pid 父级部门ID
 * @returns
 */
export const addDepartment = ({ code, introduce, manager, name, pid }) => {
  return request({
    method: 'POST',
    url: '/company/department',
    data: { code, introduce, manager, name, pid }
  })
}

/**
 * 编辑部门
 * @param {*} data
 * @returns
 */
export const editDepartment = data => {
  return request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
