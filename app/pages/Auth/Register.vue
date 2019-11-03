<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.register')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <Label textWrap="true" class="message">{{ $t('auth.registerMessage') }}</Label>

      <GridLayout rows="auto, auto" columns="*, auto">
        <TextField row="0" column="0" columnSpan="2" :hint="$t('fields.username')" v-model="username" />
        <Label row="0" column="1" class="fas" verticalAlignment="bottom" @tap="generateUsername">&#xf01e;</Label>
        <Label row="1" column="0" columnSpan="2" textWrap="true">{{ $t('auth.usernameMessage') }}</Label>
      </GridLayout>

      <Button :text="$t('auth.register')" @tap="register" />

      <Label class="agreement" textWrap="true" @tap="openTermsOfUse">{{ $t('auth.agreement') }}</Label>
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
.message {
  margin-top: 10;
  text-align: center;
}

TextField, MaskedTextField {
  margin-top: 25;
}

.fas {
  padding: 0 0 14 10;
  font-size: 18;
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
const utilsModule = require('tns-core-modules/utils/utils')
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import ConfirmPage from './Confirm.vue'
import api from '~/services/api'

export default {
  async mounted () {
    try {
      await this.generateUsername()

    } catch (ex) {
      alert(ErrorFormatter(ex))
    }
  },

  props: ['phone'],

  data () {
    return {
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
    async generateUsername () {
      try {
        LoadingIndicator.show()
        
        const res = await api.get('/auth/username/generate')
        this.username = res.data
        
        LoadingIndicator.hide()

        } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
      
    },

    async register () {
      try {
        LoadingIndicator.show()

        await this.$store.dispatch('auth/register', {
          username: this.username,
          phone: this.phone
        })

        LoadingIndicator.hide()

        this.$navigateTo(ConfirmPage)

      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    },

    openTermsOfUse () {
      try {
        utilsModule.openUrl('https://web.teseu.app/terms-of-use')

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>