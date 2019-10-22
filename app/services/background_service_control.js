import * as application from 'tns-core-modules/application'
import { device } from 'tns-core-modules/platform'
const utils = require('tns-core-modules/utils/utils')
import { BackgroundServiceClass } from './background_service'
import ErrorFormatter from '~/utils/error_formatter'

const jobId = 308

export default {
  startBackgroundService () {
    try {
      console.log('startBackgroundService')
      if (application.android) {
        console.log('application.android')
        let context = utils.ad.getApplicationContext()
        if (device.sdkVersion >= '26') {
          console.log('SDK >= 26')
          const jobScheduler = context.getSystemService(android.content.Context.JOB_SCHEDULER_SERVICE)
          const component = new android.content.ComponentName(context, BackgroundServiceClass.class)
          const builder = new android.app.job.JobInfo.Builder(jobId, component)
          builder.setOverrideDeadline(0)
          jobScheduler.schedule(builder.build())
        } else {
          console.log('SDK < 26')
          let intent = new android.content.Intent(context, BackgroundServiceClass.class)
          console.log('criou intent')
          context.startService(intent)
          console.log('iniciou service')
        }
      }
     
    } catch (ex) {
      console.log('exceção no bgService:')
      console.log(ex)
      alert(ErrorFormatter(ex))
    }
  },

  stopBackgroundService () {
    try {
      if (application.android) {
        if (device.sdkVersion >= '26') {
          this._stopBackgroundJob()
        } else {
          let context = utils.ad.getApplicationContext()
          let intent = new android.content.Intent(context, BackgroundServiceClass.class)
          context.stopService(intent)
        }
      }

    } catch (ex) {
      console.log(ex)
      alert(ErrorFormatter(ex))
    }
  },

  _stopBackgroundJob() {
    try {
      if (application.android) {
        let context = utils.ad.getApplicationContext()
        const jobScheduler = context.getSystemService(android.content.Context.JOB_SCHEDULER_SERVICE)
        if (jobScheduler.getPendingJob(jobId) !== null) {
          jobScheduler.cancel(jobId)
          console.log(`Job Canceled: ${jobId}`)
        }
      }

    } catch (ex) {
      console.log(ex)
      alert(ErrorFormatter(ex))
    }
  }
}
