// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import axios from 'axios' // 主要 AJAX 套件
import VueAxios from 'vue-axios'// 轉為 VUE 的套件 => 可直接調用 this

// BS 套件
import 'bootstrap'

Vue.config.productionTip = false
Vue.use(VueAxios, axios) // 全域設定大家都可以使用 axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
