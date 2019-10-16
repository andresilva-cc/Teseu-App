<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <MaskedTextField ref="phone" :hint="$t('fields.phone')" keyboardType="phone" mask="(99) 99999-9999" />
      <Button :text="$t('auth.sendSMSCode')" @tap="login" />
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
TextField {
  margin-top: 25;
  border-bottom-width: 1;
}

Button {
  margin-top: 30;
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import ConfirmPage from './Confirm.vue'

export default {
  data () {
    return {
      phone: ''
    }
  },

  computed: {
    plainPhone () {
      return this.phone? `55${this.phone}` : ''
    }
  },

  methods: {
    login () {
      try {
        LoadingIndicator.show()

        // Format phone
        this.phone = this.$refs.phone.nativeView.text.replace(/[+()-\s]/g, '')

        this.$store.commit('auth/setUser', { phone: this.plainPhone })
        
        LoadingIndicator.hide()
        this.$navigateTo(ConfirmPage)

      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>