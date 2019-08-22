<template>
  <Page class="auth-page" androidStatusBarBackground="#2196f3">

    <ActionBar title="Entrar" flat="true">
      <NavigationButton text="Voltar" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <StackLayout class="layout">
      <Label textWrap="true">Um código foi enviado por SMS para seu número, por favor digite-o no campo abaixo</Label>
      <TextField hint="Código"></TextField>
      <Button text="Confirmar" @tap="$navigateTo(MapPage, { clearHistory: true })" />
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