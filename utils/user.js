import request from '~/utils/request'

// 用户登录
export const login = (data) => {
  return request.post('/user/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}

// 获取列表
export const getList = (params) => {
  return request.get('/user/list', { params })
}
