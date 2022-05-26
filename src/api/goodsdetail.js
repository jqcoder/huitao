import instance from './request/request'

// 获取商品轮播
export function fetchGoodsCarousel(id){
  return  instance.get(`api/getthumbimages/${id}/`)
}

// 获取商品详细数据
export function fetchGoodsDetail(id){
  return  instance.get(`api/getgoodsinfo/${id}/`)
}
