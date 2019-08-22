<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar title="Registrar" flat="true">
      <NavigationButton text="Voltar" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <TextField hint="Nome de Usuário"></TextField>
      <Label>Seu nome de usuário será visível para todos.</Label>

      <TextField hint="Celular"></TextField>

      <Button text="Enviar código por SMS" @tap="$navigateTo(ConfirmPage)" />

      <Label class="agreement" textWrap="true">Ao se registrar, você concorda com os nossos Termos de Uso e Política de Privacidade</Label>
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