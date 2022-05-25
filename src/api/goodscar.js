import instance from './request/request'

export function fetchGoodscar(ids){
  return  instance.get(`api/getshopcarlist/${ids}`)
}
