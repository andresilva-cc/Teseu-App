<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <TextField :hint="$t('fields.phone')" keyboardType="phone" v-model="phone" />
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
import ErrorFormatter from '../../utils/error_formatter'
import ConfirmPage from './Confirm.vue'

export default {
  data () {
    return {
      ConfirmPage,

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
        this.$store.commit('auth/setUser', { phone: this.plainPhone })
        this.$navigateTo(this.ConfirmPage)

      } catch (ex) {
        if (ex.name) {
          alert(ErrorFormatter(ex))
        }
      }
    }
  }
}
</script>