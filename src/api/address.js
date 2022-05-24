import instance from './request'

// 获取用户地址
export function fetchGetUserAddress(id) {
  return instance.get(`/api/getaddress/${id}`)
}

// 添加用户地址
export function fetchAddUserAddress(id, addressInfo) {
  return instance.post(`/api/addaddress/${id}`,addressInfo)
}

// 修改用户地址
export function fetchEditUserAddress(addressId,address) {
  return instance.post(`http://api.w0824.com/api/updateaddress/${addressId}`,address)
}

// 删除用户地址
export function fetchDeleteUserAddress(addressId) {
  return instance.post(`/api/deladdress/${addressId}`)
}
