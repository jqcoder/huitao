import instance from './request'

export function fetchRegister(userinfo) {
  return instance({
    method: 'post',
    url: '/api/register',
    data: userinfo,
  })
}
