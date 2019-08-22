<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar title="Entrar" flat="true">
      <NavigationButton text="Voltar" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <TextField hint="Celular"></TextField>
      <Button text="Enviar código por SMS" @tap="$navigateTo(ConfirmPage)" />
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