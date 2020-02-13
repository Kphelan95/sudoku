import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Welcome from './components/WelcomePage.vue'
import Game from './components/Board.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  {path:'/', component : Welcome},
  {path:'/Game', component : Game}
]

const router = new VueRouter({
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
