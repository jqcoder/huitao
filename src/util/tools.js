import {nanoid} from 'nanoid'


// 生成唯一的订单号
export function genOrderId() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  const rondom = nanoid()
  const order_id = `${year}${month}${day}${hours}${minutes}${seconds}${rondom}`
  return order_id;
}
