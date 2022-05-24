import instance from './request'

export function fetchCarousel(user){
  return  instance.post('/api/login',user)
}
