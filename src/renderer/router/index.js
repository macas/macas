import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'interface-list',
      component: require('@/components/InterfaceList').default,
      children: [
        {
          path: ':device',
          name: 'interface-detail',
          component: require('@/components/InterfaceDetail').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
