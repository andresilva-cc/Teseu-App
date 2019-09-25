import Vue from 'nativescript-vue'

Vue.filter('phone', value => {
  return `(${value.substring(2, 4)}) ${value.substring(4, 9)}-${value.substring(9, 13)}`
})

Vue.filter('uppercase', value => {
  return value.toUpperCase()
})