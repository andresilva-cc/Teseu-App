import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import auth from './modules/auth'
import category from './modules/category'
import occurrence from './modules/occurrence/'
import occurrenceComment from './modules/occurrence/comment'
import userContact from './modules/user/contact'
import userPlace from './modules/user/place'
import userSettings from './modules/user/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    category,
    occurrence,
    occurrenceComment,
    userContact,
    userPlace,
    userSettings
  }
})