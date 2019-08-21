<template>
  <Page class="auth-page" actionBarHidden="true" androidStatusBarBackground="#2196f3">
    <StackLayout class="layout">

      <Image class="logo" src="~/resources/images/logo.png"></Image>

      <Label class="title">TESEU</Label>
      <Label class="message" textWrap="true">Entre ou registre-se para obter notificações de crimes ocorrendo próximos à sua localização.</Label>

      <Button class="login-button" text="Entrar" />
      <Button text="Registrar" />
      
      <Label class="view-only" @tap="$navigateTo(MapPage)">Somente visualizar</Label>

    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
.logo {
  margin-top: 50;
  width: 125;
  height: 125;
}

.title {
  font-size: 32;
  margin-top: 15;
  margin-bottom: 30;
  font-weight: 500;
  text-align: center;
}

.message {
  font-size: 18;
  text-align: center;
}

.login-button {
  margin-top: 50;
}

.view-only {
  margin-top: 100;
  text-align: center;
}
</style>

<script>
import MapPage from './Map'

export default {
  data () {
    return {
      MapPage
    }
  }
}
</script>