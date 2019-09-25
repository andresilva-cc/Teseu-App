import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './modules/auth'
import category from './modules/category'
import userContact from './modules/user/contact'
import userPlace from './modules/user/place'
import userSettings from './modules/user/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    category,
    userContact,
    userPlace,
    userSettings
  }
})