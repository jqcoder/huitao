import instance from './request/request'

export function fetchSearch(data) {
  let search = Object.keys(data).map((item,) => {
    return `${item}=${encodeURIComponent(data[item])}`
  }).join('&')
  return instance.get(`/api/search?${search}`)
}
