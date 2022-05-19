import instance from './request'

export function fetchCarousel(){
  return  instance.get('/api/getlunbo')
}

export function fetchProductList(page=1,limit=6){
  return  instance.get(`/api/recommend?page=${page}&limit=${limit}`)
}
