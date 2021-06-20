let Vue
function install(_Vue) {
  Vue = _Vue
  // 1.混入store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
// 2.实现store(响应式,选项的处理)
class Store {
  constructor(options = {}){
    // 响应化处理
    this.store = new Vue({
      data: options.state
    })
    this.mutations = options.mutations || {}

  }
  commit =  ()=>{

  }
}