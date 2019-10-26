import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import * as application from 'tns-core-modules/application'
import * as ApplicationSettings from 'application-settings'
import { device } from 'tns-core-modules/platform'
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

    // Start interval
    intervalId = setInterval(async () => {
      try {
        // Ask for location permission
        await geolocation.enableLocationRequest()
    
        // Check if permission is given
        const isEnabled = await geolocation.isEnabled()
    
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
        alert(ErrorFormatter(ex))
      }
    }, frequency)

  } catch (ex) {
    alert(ErrorFormatter(ex))
  }
}

export function getBackgroundServiceClass() {
  if (application.android) {
    if (device.sdkVersion < '26') {
      const BackgroundService = android.app.Service.extend('app.teseu.app.BackgroundService', {
        constructor() {
          this.super()
          return global.__native(this)
        },
        onStartCommand(intent, flags, startId) {
          this.super.onStartCommand(intent, flags, startId)
          return android.app.Service.START_STICKY
        },
        onCreate() {
          _startWatch()
        },
        onBind(intent) {
        },
        onUnbind(intent) {
        },
        onDestroy() {
          clearInterval(intervalId)
        }
      })
      return BackgroundService
    } else {
      const BackgroundService26 = android.app.job.JobService.extend('app.teseu.app.BackgroundService26', {
        constructor() {
          this.super()
          return global.__native(this)
        },
        onStartJob() {
          _startWatch()
          return true
        },
        onStopJob(jobParameters) {
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