import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import * as application from 'tns-core-modules/application'
import * as ApplicationSettings from 'application-settings'
import { device } from 'tns-core-modules/platform'
import { LocalNotifications } from 'nativescript-local-notifications'
import ErrorFormatter from '~/utils/error_formatter'
import api from '~/services/api'

let intervalId

function _startWatch() {
  try {
    // Define frequency of updates
    let frequency = 60000
  
    // If user settings are defined, use user defined frequency
    if (ApplicationSettings.getString('store/userSettings')) {
      const userSettings = JSON.parse(ApplicationSettings.getString('store/userSettings'))
      frequency = userSettings.settings.frequency * 60000
    }
  
    console.log('frequency: ' + frequency)
  
    // Start interval
    intervalId = setInterval(async () => {
      try {
        console.log('tick')
    
        // Ask for location permission
        await geolocation.enableLocationRequest()
    
        // Check if permission is given
        const isEnabled = await geolocation.isEnabled()
    
        console.log('isEnabled: ' + isEnabled)
        
        if (isEnabled) {
          // Get user location
          const { latitude, longitude } = await geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.HIGH
          })

          // Check for nearby occurrences
          await api.post('/user/location', {
            location: {
              type: 'Point',
              coordinates: [
                latitude,
                longitude
              ]
            }
          })
        }

      } catch (ex) {
        console.log(ex)
        alert(ErrorFormatter(ex))
      }
    }, frequency)

  } catch (ex) {
    console.log(ex)
    alert(ErrorFormatter(ex))
  }
}

export function getBackgroundServiceClass() {
  console.log('getClass')
  if (application.android) {
    console.log('[service] application.android')
    if (device.sdkVersion < '26') {
      console.log('[service] sdkVersion < 26')
      const BackgroundService = android.app.Service.extend('app.teseu.app.BackgroundService', {
        constructor() {
          console.log('constructor')
          this.super()
          return global.__native(this)
        },
        onStartCommand(intent, flags, startId) {
          console.log('service onStartCommand')
          this.super.onStartCommand(intent, flags, startId)
          return android.app.Service.START_STICKY
        },
        onCreate() {
          console.log('service onCreate')
          _startWatch()
        },
        onBind(intent) {
          console.log('service onBind')
        },
        onUnbind(intent) {
          console.log('service onUnbind')
        },
        onDestroy() {
          console.log('service onDestroy')
          clearInterval(intervalId)
        }
      })
      return BackgroundService
    } else {
      console.log('[service] sdkVersion >= 26')
      const BackgroundService26 = android.app.job.JobService.extend('app.teseu.app.BackgroundService26', {
        constructor() {
          console.log('constructor 26')
          this.super()
          return global.__native(this)
        },
        onStartJob() {
          console.log('service onStartJob')
          _startWatch()
          return true
        },
        onStopJob(jobParameters) {
          console.log('service onStopJob')
          this.jobFinished(jobParameters, false)
          clearInterval(intervalId)
          return false
        }
      })
      return BackgroundService26
    }
  } else {
    return null
  }
}
export const BackgroundServiceClass = getBackgroundServiceClass()