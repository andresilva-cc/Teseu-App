import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Locales
import pt_BR from './pt_BR'

Vue.use(VueI18n)

const messages = {
  pt_BR
}

export default new VueI18n({
  locale: 'pt_BR',
  messages
})