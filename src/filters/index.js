import Vue from 'vue'
import moment from "moment";

Vue.filter('zeroPadding', (value) => {
  return value.toFixed(2, 0)
})

Vue.filter('formatTime', (value) => {
  return moment.unix(value).format("YYYY-MM-DD HH:mm:ss")
})
