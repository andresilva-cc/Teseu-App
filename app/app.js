import VueDevTools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import * as application from 'tns-core-modules/application'
import * as ApplicationSettings from 'application-settings'
import store from './stores'
import i18n from './resources/lang'
import config from './config.json'
import BackgroundServiceControl from '~/services/background_service_control'

// Pages
import Welcome from './pages/Welcome'
import Map from './pages/Map'

// Vue Dev Tools
if (config.ENVIRONMENT === 'development')
  Vue.use(VueDevTools, { host: config.DEVTOOLS_HOST })

// Load plugins
require('./plugins')

// Load filters
require('./utils/filters')

// Load auth store from application settings
store.commit('auth/load')
store.commit('userSettings/load')

// If development and bypass auth, set token provided in config
if (config.ENVIRONMENT === 'development' && config.DEV_BYPASS_AUTH) {
  store.commit('auth/setToken', config.DEV_ACCESSKEY)
  ApplicationSettings.setBoolean('isAuthenticated', true)
}

// Subscribe store to application settings
store.subscribe((mutation, state) => {
  ApplicationSettings.setString('store/auth', JSON.stringify(state.auth))
  ApplicationSettings.setString('store/userSettings', JSON.stringify(state.userSettings))
})

const isAuthenticated = ApplicationSettings.hasKey('isAuthenticated') && ApplicationSettings.getBoolean('isAuthenticated')

// Application Lifecycle Events
application.on(application.resumeEvent, args => {
  BackgroundServiceControl.stopBackgroundService()

  if (isAuthenticated && store.getters['userSettings/get'].enableNotifications) {
    BackgroundServiceControl.startBackgroundService()
  }
})

// Create Vue instance and start it
new Vue({
  template: `
    <Frame>
      ${isAuthenticated? '<Map />' : '<Welcome />'}
    </Frame>`,

  components: {
    Map,
    Welcome
  },

  store,
  i18n
}).$start()
