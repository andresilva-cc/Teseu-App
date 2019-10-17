import { crashlytics } from 'nativescript-plugin-firebase'
import i18n from '../resources/lang'

export default ex => {
  // Send crash log to Crashlytics
  crashlytics.sendCrashLog(ex)

  // Format exception
  switch (ex.name) {
    case 'DuplicateContactError':
      return {
        title: i18n.t('errors.duplicateContact'),
        message: i18n.t('errors.duplicateContactDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'EmergencyModeAlreadyEnabledError':
      return {
        title: i18n.t('errors.emergencyModeAlreadyEnabled'),
        message: i18n.t('errors.emergencyModeAlreadyEnabledDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'EmergencyModeNotEnabledError':
      return {
        title: i18n.t('errors.emergencyModeNotEnabled'),
        message: i18n.t('errors.emergencyModeNotEnabledDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'InvalidRequestCodeError':
      return {
        title: i18n.t('errors.invalidRequestCode'),
        message: i18n.t('errors.invalidRequestCodeDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'InvalidVerificationCodeError':
      return {
        title: i18n.t('errors.invalidVerificationCode'),
        message: i18n.t('errors.invalidVerificationCodeDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'MinimumOneCategoryError':
      return {
        title: i18n.t('errors.minimumOneCategory'),
        message: i18n.t('errors.minimumOneCategoryDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'TokenError':
      return {
        title: i18n.t('errors.tokenError'),
        message: i18n.t('errors.tokenErrorDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'ServiceUnavailableError':
      return {
        title: i18n.t('errors.serviceUnavailable'),
        message: i18n.t('errors.serviceUnavailableDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'ValidationError':
      return {
        title: i18n.t('errors.validationError'),
        message: i18n.t(`validation.${ex.validator}`, { field: i18n.t(`fields.${ex.field}`) }),
        okButtonText: i18n.t('common.ok')
      }

    case 'TooManyAttemptsError':
      return {
        title: i18n.t('errors.tooManyAttempts'),
        message: i18n.t('errors.tooManyAttemptsDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'UnauthorizedError':
      return {
        title: i18n.t('errors.unauthorized'),
        message: i18n.t('errors.unauthorizedDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'UnknownError':
      return {
        title: i18n.t('errors.unknownError'),
        message: i18n.t('errors.unknownErrorDescription'),
        okButtonText: i18n.t('common.ok')
      }

    case 'UnknownError':
      return {
        title: i18n.t('errors.unknownError'),
        message: i18n.t('errors.unknownErrorDescription'),
        okButtonText: i18n.t('common.ok')
      }
      
    case 'UserNotFoundError':
      return {
        title: i18n.t('errors.userNotFound'),
        message: i18n.t('errors.userNotFoundDescription'),
        okButtonText: i18n.t('common.ok')
      }

    default:
      return {
        title: i18n.t('errors.unknownError'),
        message: i18n.t('errors.unknownErrorDescription'),
        okButtonText: i18n.t('common.ok')
      }
      
  }
}