import instance from './request'

export function fetchGoodsList(page=1,pagesize=10 ){
  return  instance.get(`api/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}
