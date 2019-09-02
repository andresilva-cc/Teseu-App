<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <Label textWrap="true">{{ $t('auth.SMSCodeMessage') }}</Label>
      <TextField :hint="$t('fields.code')" v-model="code"></TextField>
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
import ErrorFormatter from '../../utils/error_formatter'
import MapPage from '../Map'

export default {
  async created () {
    try {
      await this.$store.dispatch('auth/sendSMS')

    } catch (ex) {
      if (ex.name) {
        alert(ErrorFormatter(ex))
      }
    }
  },

  data () {
    return {
      MapPage,

      code: ''
    }
  },

  methods: {
    async confirm () {
      try {
        await this.$store.dispatch('auth/checkSMS', this.code)
        this.$navigateTo(this.MapPage, { clearHistory: true })
        
      } catch (ex) {
        if (ex.name) {
          alert(ErrorFormatter(ex))
        }
      }
    }
  }
}
</script>