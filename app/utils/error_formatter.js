import i18n from '../resources/lang'

export default ex => {
  switch (ex.name) {
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
  }
}