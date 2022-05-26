import instance from './request/request'

// 提交订单
export function fetchCommitOrder(order) {
  return instance.post(`/api/commitorder`, order)
}

// 获取所有订单
export function fetchGetUserOrder(user_id) {
  return instance.post(`/api/userorder/${user_id}`)
}

// 获取订单详情
export function fetchGetOrderDetail(order_id) {
  return instance.post(`/api/getorder/${order_id}`)
}

// 立即支付(模拟订单支付成功)
export function fetchPayment(order_id) {
  return instance.post(`/api/payorder/${order_id}`)
}

// 物流信息
export function fetchKuaiDi() {
  return instance.get(`/api/kuaidi100`)
}
