import instance from './request'

export function fetchUpdateUserImg(userinfo) {
  return instance({
    method: 'post',
    url: '/api/upload',
    data: userinfo,
    headers: {
      'Content-Type': 'multipart/form-data', // 关键
    }
  })
}
