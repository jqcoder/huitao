import instance from './request'

export function fetchLogin(user){
  return  instance.post('/api/login',user)
}

export function fetchRegister(userinfo) {
  return instance({
    method: 'post',
    url: '/api/register',
    data: userinfo,
  })
}

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
