import instance from './request/request'

// 提交订单
export function fetchCommitOrder(order){
  return  instance.post(`/api/commitorder`,order)
}

// 获取所有订单
export function fetchGetUserOrder(user_id){
  return  instance.post(`/api/userorder/${user_id}`)
}
