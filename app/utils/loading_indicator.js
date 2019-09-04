const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator
const Mode = require('@nstudio/nativescript-loading-indicator').Mode

const loader = new LoadingIndicator()

const options = {
  margin: 10,
  dimBackground: true,
  color: '#cccccc',
  mode: Mode.Indeterminate,
  hideBezel: true
}

export default {
  show: (message, details) => {
    try {
      loader.show({
        message,
        details,
        ...options
      })

    } catch (ex) {
      throw ex
    }
  },

  hide: () => {
    try {
      loader.hide()

    } catch (ex) {
      throw ex
    }
  }
}