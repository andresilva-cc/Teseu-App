// NativeScript-Vue
import Vue from 'nativescript-vue'

// Plugins
import VueDevTools from 'nativescript-vue-devtools'
import RadDataForm from 'nativescript-ui-dataform/vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'

import config from './config.json'


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
Vue.use(RadSideDrawer)

// Vue Dev Tools
if (config.ENVIRONMENT === 'development')
  Vue.use(VueDevTools, { host: config.DEVTOOLS_HOST })