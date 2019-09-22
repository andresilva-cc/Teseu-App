<template>
  <Page actionBarHidden="true" androidStatusBarBackground="#2196f3">
    <GridLayout rows="auto, *, auto, auto" columns="*, auto">
      <!-- Map -->
      <MapView row="0" col="0" rowSpan="4" colSpan="2"></MapView>

      <!-- Search bar -->
      <Label row="0" col="0" colSpan="2" class="search-bar" horizontalAlignment="center" verticalAlignment="center">
        <FormattedString>
          <Span class="fa" text.decode="&#xf0c9;" />
          <Span text="   " />
          <Span :text="$t('common.searchPlacesPlaceholder')" />
        </FormattedString>
      </Label>

      <!-- FAB -->
      <fab row="2" col="1" icon="~/resources/images/icons/add_white.png" class="fab" />

      <!-- Last update -->
      <Label row="3" col="0" colSpan="2" class="last-update">{{ $t('common.lastSuccessfulUpdate', { time: '1 min' }) }}</Label>
    </GridLayout>
  </Page>
</template>

<style lang="scss" scoped>
.search-bar {
  width: 95%;
  margin-top: 15;
  padding: 10 20;
  border-radius: 10;
  background-color: #ffffff;
  font-size: 18;
}

.fab {
  height: 70;
  width: 70;
  margin: 15;
  background-color: #1565c0;
}

.last-update {
  width: 100%;
  padding: 3;
  // TODO: Background opacity
  background-color: #2196f3;
  color: #ffffff;
  text-align: center;
}
</style>

<script>
  import ErrorFormatter from '../utils/error_formatter'
  import WelcomePage from './Welcome'

  export default {
  }
</script>
