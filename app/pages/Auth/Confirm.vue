<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <Label textWrap="true">{{ $t('auth.SMSCodeMessage') }}</Label>
      <TextField :hint="$t('fields.code')" keyboardType="number" v-model="code"></TextField>
      <Button :text="$t('common.confirm')" @tap="confirm" />
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
Label {
  margin-top: 30;
  text-align: center;
}

TextField {
  margin-top: 25;
  border-bottom-width: 1;
}

Button {
  margin-top: 50;
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import MapPage from '~/pages/Map'

export default {
  async created () {
    try {
      await this.sendSMS()

    } catch (ex) {
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      code: ''
    }
  },

  methods: {
    async sendSMS () {
      try {
        await this.$store.dispatch('auth/sendSMS')

      } catch (ex) {
        if (ex.name === 'UserNotFoundError')
          this.$navigateBack()
        alert(ErrorFormatter(ex))
      }
    },

    async confirm () {
      try {
        LoadingIndicator.show()
        await this.$store.dispatch('auth/checkSMS', this.code)
        LoadingIndicator.hide()
        this.$navigateTo(MapPage, { clearHistory: true })
        
      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
        if (ex.name === 'TooManyAttemptsError')
          this.sendSMS()
      }
    }
  }
}
</script>