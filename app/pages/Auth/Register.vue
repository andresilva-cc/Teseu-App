<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.register')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <TextField :hint="$t('fields.username')"></TextField>
      <Label>{{ $t('auth.usernameMessage') }}</Label>

      <MaskedTextField :hint="$t('fields.phone')" keyboardType="phone" mask="(00) 00000-0000" />

      <Button :text="$t('auth.sendSMSCode')" @tap="$navigateTo(ConfirmPage)" />

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
import ConfirmPage from './Confirm.vue'

export default {
  data () {
    return {
      ConfirmPage
    }
  }
}
</script>