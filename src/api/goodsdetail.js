import instance from './request/request'

export function fetchGoodsCarousel(id){
  return  instance.get(`api/getthumbimages/${id}/`)
}

export function fetchGoodsDetail(id){
  return  instance.get(`api/getgoodsinfo/${id}/`)
}
