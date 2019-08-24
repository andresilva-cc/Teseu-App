<template>
  <Page class="auth-page" actionBarHidden="true" androidStatusBarBackground="#2196f3">
    <StackLayout class="layout">

      <Image class="logo" src="~/resources/images/logo.png"></Image>

      <Label class="title">TESEU</Label>
      <Label class="message" textWrap="true">{{ $t('common.welcomeMessage') }}</Label>

      <Button class="login-button" :text="$t('auth.login')" @tap="$navigateTo(LoginPage)" />
      <Button :text="$t('auth.register')" @tap="$navigateTo(RegisterPage)" />
      
      <Label class="view-only" @tap="confirmViewOnly">{{ $t('auth.viewOnly') }}</Label> 

    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
.logo {
  margin-top: 50;
  width: 125;
  height: 125;
}

.title {
  font-size: 32;
  margin-top: 15;
  margin-bottom: 30;
  font-weight: 500;
  text-align: center;
}

.message {
  font-size: 18;
  text-align: center;
}

.login-button {
  margin-top: 50;
}

.view-only {
  margin-top: 100;
  text-align: center;
}
</style>

<script>
import LoginPage from './Auth/Login'
import RegisterPage from './Auth/Register'
import MapPage from './Map'

export default {
  data () {
    return {
      LoginPage,
      RegisterPage,
      MapPage
    }
  },

  methods: {
    confirmViewOnly () {
      confirm({
        title: this.$t('common.alert'),
        message: this.$t('auth.viewOnlyMessage'),
        cancelButtonText: this.$t('common.cancel'),
        okButtonText: this.$t('common.continue')
      }).then(result => {
        if (result) {
          this.$navigateTo(this.MapPage, { clearHistory: true })
        }
      })
    }
  }
}
</script>