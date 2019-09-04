<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.register')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <TextField :hint="$t('fields.username')" v-model="username" />
      <Label>{{ $t('auth.usernameMessage') }}</Label>

      <TextField :hint="$t('fields.phone')" keyboardType="phone" v-model="phone" />

      <Button :text="$t('auth.sendSMSCode')" @tap="register" />

      <Label class="agreement" textWrap="true">{{ $t('auth.agreement') }}</Label>
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
TextField, MaskedTextField {
  margin-top: 25;
}

Button {
  margin-top: 30;
}

.agreement {
  text-align: center;
  margin-top: 25
}
</style>

<script>
import LoadingIndicator from '../../utils/loading_indicator'
import ErrorFormatter from '../../utils/error_formatter'
import ConfirmPage from './Confirm.vue'
import api from '../../api'

export default {
  async mounted () {
    LoadingIndicator.show()

    const res = await api.get('/auth/username/generate')
    this.username = res.data
    
    LoadingIndicator.hide()
  },

  data () {
    return {
      ConfirmPage,

      username: '',
      phone: ''
    }
  },

  computed: {
    plainPhone () {
      return this.phone? `55${this.phone}` : ''
    }
  },

  methods: {
    async register () {
      try {
        LoadingIndicator.show()
        await this.$store.dispatch('auth/register', {
          username: this.username,
          phone: this.plainPhone
        })

        LoadingIndicator.hide()

        this.$navigateTo(this.ConfirmPage)

      } catch (ex) {
        LoadingIndicator.hide()
        if (ex.name) {
          alert(ErrorFormatter(ex))
        }
      }
    }
  }
}
</script>