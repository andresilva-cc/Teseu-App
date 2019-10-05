<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.register')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <GridLayout rows="auto, auto" columns="*, auto">
        <TextField row="0" column="0" columnSpan="2" :hint="$t('fields.username')" v-model="username" />
        <Label row="0" column="1" class="fas" verticalAlignment="bottom" @tap="generateUsername">&#xf01e;</Label>
        <Label row="1" column="0" columnSpan="2">{{ $t('auth.usernameMessage') }}</Label>
      </GridLayout>

      <MaskedTextField ref="phone" :hint="$t('fields.phone')" keyboardType="phone" mask="(99) 99999-9999" />

      <Button :text="$t('auth.sendSMSCode')" @tap="register" />

      <Label class="agreement" textWrap="true">{{ $t('auth.agreement') }}</Label>
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
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
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import ConfirmPage from './Confirm.vue'
import api from '~/services/api'

export default {
  async mounted () {
    await this.generateUsername()
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

        // Format phone
        this.phone = this.$refs.phone.nativeView.text.replace(/[+()-\s]/g, '')

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