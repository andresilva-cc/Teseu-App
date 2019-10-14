<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.registerOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <GridLayout rows="*, *">
      
      <FlexboxLayout row="0" class="detail" @tap="goToDetailOccurrencePage">
        <Label class="fas">&#xf304;</Label>
        <Label textWrap="true" verticalAligment="center">{{ $t('sections.registerOccurrenceDetailMessage') }}</Label>
      </FlexboxLayout>

      <FlexboxLayout row="1" class="emergency" @tap="enableEmergencyMode">
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
import * as Toast from 'nativescript-toast'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import WelcomePage from '~/pages/Welcome'
import MapPage from '~/pages/Map'
import DetailOccurrencePage from './Detail'

export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },

  methods: {
    askForAuthentication () {
      confirm({
        title: this.$t('auth.authenticationRequired'),
        message: this.$t('auth.authenticationRequiredDescription'),
        cancelButtonText: this.$t('common.no'),
        okButtonText: this.$t('common.yes')
      }).then(async result => {
        if (result) 
          this.$navigateTo(WelcomePage, { clearHistory: true })
      })
    },

    goToDetailOccurrencePage () {
       if (!this.isAuthenticated) {
         this.askForAuthentication()
         return
       }

      this.$navigateTo(DetailOccurrencePage)
    },

    async enableEmergencyMode () {
      try {
        if (!this.isAuthenticated) {
          confirm({
            title: this.$t('auth.authenticationRequired'),
            message: this.$t('auth.authenticationRequiredDescription'),
            cancelButtonText: this.$t('common.no'),
            okButtonText: this.$t('common.yes')
          }).then(async result => {
            if (result) 
              this.$navigateTo(WelcomePage, { clearHistory: true })
          })
        } else {
          confirm({
            title: this.$t('common.attention'),
            message: this.$t('sections.emergencyModeEnableDialogMessage'),
            cancelButtonText: this.$t('common.cancel'),
            okButtonText: this.$t('common.alertAction')
          }).then(async result => {
            if (result) {
              LoadingIndicator.show()
      
              await this.$store.dispatch('emergencyMode/enable')
      
              LoadingIndicator.hide()
      
              Toast.makeText(this.$t('sections.emergencyModeEnabled')).show()
  
              this.$navigateTo(MapPage, { clearHistory: true })
            }
          })
        }

      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>