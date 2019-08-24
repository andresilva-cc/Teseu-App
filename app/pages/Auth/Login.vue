<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <MaskedTextField :hint="$t('fields.phone')" keyboardType="phone" mask="(00) 00000-0000" />
      <Button :text="$t('auth.sendSMSCode')" @tap="$navigateTo(ConfirmPage)" />
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
import ConfirmPage from './Confirm.vue'

export default {
  data () {
    return {
      ConfirmPage
    }
  }
}
</script>