<template>
  <Page class="auth-page" actionBarHidden="true" androidStatusBarBackground="#2196f3" @loaded="loaded">
    <GridLayout rows="auto, *, auto" columns="*" class="layout">
      
      <StackLayout row="0">
        <Image class="logo" src="~/resources/images/logo.png"></Image>

        <Label class="title">TESEU</Label>
        <Label class="message" textWrap="true">{{ $t('common.welcomeMessage') }}</Label>

        <Button class="login-button" :text="$t('auth.login')" @tap="$navigateTo(LoginPage)" />
      </StackLayout>

      <Label row="2" class="view-only" @tap="confirmViewOnly">{{ $t('auth.viewOnly') }}</Label> 
    
    </GridLayout>

  </Page>
</template>

<style lang="scss" scoped>
.logo {
  margin-top: 50;
  width: 125;
  height: 125;
}

.title {
  font-size: 28;
  margin-top: 15;
  margin-bottom: 30;
  font-weight: 500;
  text-align: center;
}

.message {
  font-size: 16;
  text-align: center;
}

.login-button {
  margin-top: 50;
}

.view-only {
  margin-bottom: 25;
  text-align: center;
}
</style>

<script>
import ErrorFormatter from '~/utils/error_formatter'
import LoadingIndicator from '~/utils/loading_indicator'
import LoginPage from './Auth/Login'
import MapPage from './Map'
import * as ApplicationSettings from 'application-settings'

export default {
  data () {
    return {
      LoginPage,
      MapPage
    }
  },

  methods: {
    loaded () {
      LoadingIndicator.show()

      if (ApplicationSettings.hasKey('isAuthenticated') && ApplicationSettings.getBoolean('isAuthenticated')) {
        this.$navigateTo(this.MapPage, { clearHistory: true })
      }

      LoadingIndicator.hide()
    },

    async confirmViewOnly () {
      confirm({
        title: this.$t('common.alert'),
        message: this.$t('auth.viewOnlyMessage'),
        cancelButtonText: this.$t('common.cancel'),
        okButtonText: this.$t('common.continue')
      }).then(async result => {
        if (result) {
          try {
            LoadingIndicator.show()
            await this.$store.dispatch('auth/generateViewOnlyToken')
            LoadingIndicator.hide()
            
            this.$navigateTo(this.MapPage, { clearHistory: true })

          } catch (ex) {
            alert(ErrorFormatter(ex))
          }
        }
      })
    }
  }
}
</script>