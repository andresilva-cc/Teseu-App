<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.registerOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <GridLayout rows="*, *">
      
      <FlexboxLayout row="0" class="detail">
        <Label class="fas">&#xf304;</Label>
        <Label textWrap="true" verticalAligment="center">{{ $t('sections.registerOccurrenceDetailMessage') }}</Label>
      </FlexboxLayout>

      <FlexboxLayout row="1" class="emergency">
        <Label class="fas">&#xf071;</Label>
        <Label textWrap="true" verticalAligment="center">{{ $t('sections.registerOccurrenceEmergencyMessage') }}</Label>
        <Label textWrap="true" verticalAligment="center" class="bottom-message">{{ $t('sections.registerOccurrenceEmergencyBottomMessage') }}</Label>
      </FlexboxLayout>

    </GridLayout>
  </Page>
</template>

<style lang="scss" scoped>
GridLayout {
  font-size: 24;
  color: #ffffff;
  text-align: center;
  font-weight: 500;
}

FlexboxLayout {
  flex-direction: column;
  justify-content: center;
  padding: 0 25;
  
  .fas {
    font-size: 42;
    margin-bottom: 15;
  }

  &.detail {
    background-color: #00a6ff;
  }

  &.emergency {
    background-color: #f44336;

    .bottom-message {
      margin-top: 5; 
      font-size: 20;
    }
  }
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'

export default {
}
</script>