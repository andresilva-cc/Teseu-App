// NativeScript-Vue
import Vue from 'nativescript-vue'

// Plugins
const firebase = require('nativescript-plugin-firebase')
import RadDataForm from 'nativescript-ui-dataform/vue'
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
import moment from 'moment'

firebase.init({
  showNotifications: true,
  showNotificationsWhenInForeground: true,

  onMessageReceivedCallback: message => {
    console.log(`[Firebase] onMessageReceivedCallback: ${JSON.stringify(message)}`)
  }
})
  .then(() => {
    console.log('[Firebase] Initialized')
  })
  .catch(ex => {
    console.log('[Firebase Initialize Error: ' + ex)
  })

Vue.registerElement('MaskedTextField', () => require('nativescript-masked-text-field').MaskedTextField,
  {
    model: {
      prop: 'text',
      event: 'textChange'
    }
  }
)
Vue.registerElement('CheckBox', () => require('@nstudio/nativescript-checkbox').CheckBox,
  {
    model: {
      prop: 'checked',
      event: 'checkedChange'
    }
  }
)
Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)
Vue.registerElement('Fab', () => require('@nstudio/nativescript-floatingactionbutton').Fab)
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown)
Vue.use(RadDataForm)
Vue.use(RadSideDrawer)

moment.locale('pt-br')