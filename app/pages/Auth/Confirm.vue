<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('auth.login')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <Label textWrap="true">{{ $t('auth.SMSCodeMessage') }}</Label>
      <TextField :hint="$t('fields.code')"></TextField>
      <Button :text="$t('common.confirm')" @tap="$navigateTo(MapPage, { clearHistory: true })" />
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
import MapPage from '../Map'

export default {
  data () {
    return {
      MapPage
    }
  }
}
</script>