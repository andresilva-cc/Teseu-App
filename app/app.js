import Vue from 'nativescript-vue'
import store from './stores'
import i18n from './resources/lang'

import Welcome from './pages/Welcome'

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


new Vue({
    template: `
        <Frame>
            <Welcome />
        </Frame>`,

    components: {
      Welcome
    },

    store,
    i18n
}).$start()
