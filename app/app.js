import Vue from 'nativescript-vue'
import * as ApplicationSettings from 'application-settings'
import VueDevTools from 'nativescript-vue-devtools'
import store from './stores'
import i18n from './resources/lang'
import RadDataForm from 'nativescript-ui-dataform/vue'

// Pages
import Welcome from './pages/Welcome'
import Map from './pages/Map'

// Plugins
Vue.registerElement(
  'MaskedTextField',
  () => require('nativescript-masked-text-field').MaskedTextField,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
Vue.use(RadDataForm)

// Vue Dev Tools
Vue.use(VueDevTools, { host: '192.168.0.108' })

// Load auth store from application settings
store.commit('auth/load')

// Subscribe auth store to application settings
store.subscribe((mutation, state) => {
  ApplicationSettings.setString('store/auth', JSON.stringify(state.auth))
})

// Create Vue instance and start it
new Vue({
  template: `
    <Frame>
      ${store.getters['auth/isAuthenticated']? '<Map />' : '<Welcome />'}
    </Frame>`,

  components: {
    Map,
    Welcome
  },

  store,
  i18n
}).$start()
