import Vue from 'vue'
import Router from 'vue-router'
import TheisVue from "../components/TheisVue";

Vue.use(Router)

export default new Router({
  routes: [
    // 重定向,如果用户访问是/ ,重定向到 /query_theis
    {
      path: '/',
      redirect: '/query_theis'
    },
    {
      path: '/query_theis',
      name: 'TheisVue',
      component: TheisVue
    }
  ]
})
