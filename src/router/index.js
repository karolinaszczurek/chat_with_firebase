import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if (to.params.name) {
          next()
        } else {
          next({ name: 'Welcome'})
        }

      //  beforeEnter to funckja arrow, ktora przyjmuje
      //  trzy parametry:
      //  to - komponent do ktorego chcemy isc
      //  form - skad przyszlismy
      //  next to funkcja, którą wywołamy by iść dalej 0 czyli do chat
      //  musimy sprawdzic czy isnieje param name - by isc dalej

      }
    }
  ]
})
