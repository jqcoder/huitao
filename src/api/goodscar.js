import instance from './request'

export function fetchGoodscar(ids){
  return  instance.get(`api/getshopcarlist/${ids}`)
}
