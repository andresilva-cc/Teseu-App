import Vue from 'nativescript-vue'
import * as ApplicationSettings from 'application-settings'
import store from './stores'
import i18n from './resources/lang'
import config from './config.json'

// Pages
import Welcome from './pages/Welcome'
import Map from './pages/Map'

// Load plugins
require('./plugins')

// Load filters
require('./utils/filters')

// Load auth store from application settings
store.commit('auth/load')

// If development and bypass auth, set token provided in config
if (config.ENVIRONMENT === 'development' && config.DEV_BYPASS_AUTH)
  store.commit('auth/setToken', config.DEV_ACCESSKEY)

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
