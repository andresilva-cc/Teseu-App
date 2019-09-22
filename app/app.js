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
Vue.registerElement('MaskedTextField', () => require('nativescript-masked-text-field').MaskedTextField,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)
Vue.registerElement('Fab', () => require('@nstudio/nativescript-floatingactionbutton').Fab)
Vue.use(RadDataForm)

// Vue Dev Tools
Vue.use(VueDevTools, { host: '192.168.0.108' })

// Load auth store from application settings
store.commit('auth/load')

store.commit('auth/setToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEZWVoIiwicGhvbmUiOiI1NTQ3OTk5MDAxNDE1IiwiaWF0IjoxNTY5MDE1Mzc2LCJhdWQiOiJhcHAifQ.7YD0LvgpknoIAqK5FwWxtQJ_5o4C5ed5IbiphaanCk8')

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
