<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.myPlaces')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <GridLayout rows="*, auto" columns="*">
      
      <!-- Places list -->
      <ScrollView row="0" columns="0" rowSpan="2">
        <ListView for="place in userPlaces" v-if="userPlaces.length > 0" @itemTap="listTap">
          <v-template>
            <StackLayout class="item">
              <Label class="name">{{ place.name }}</Label>
              <Label class="radius">{{ place.radius }} {{ $t('fields.meters') }}</Label>
            </StackLayout>
          </v-template>
        </ListView>

        <StackLayout v-else class="no-results">
          <Label horizontalAlignment="center">{{ $t('sections.myPlacesNoResults') }}</Label>
        </StackLayout>
      </ScrollView>

      <!-- FAB -->
      <fab row="1" columns="0" icon="~/resources/images/icons/add_white.png" class="fab" @tap="$navigateTo(CreatePlacePage)" />

    </GridLayout>
  </Page>
</template>

<style lang="scss" scoped> 
ListView {
  margin-top: 10;
}

.no-results {
  margin-top: 10;
}

.item {
  margin: 10 5;
  padding: 5 15;
}

Label.name {
  font-weight: bold;
  font-size: 18;
  color: #111111;
}

Label.radius {
  font-size: 14;
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import CreatePlacePage from './Create'
import * as Toast from 'nativescript-toast'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      await this.$store.dispatch('userPlace/fetch')

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      CreatePlacePage
    }
  },

  computed: {
    userPlaces () {
      return this.$store.getters['userPlace/get']
    }
  },

  methods: {
    async listTap (event) {
      confirm({
        title: this.$t('sections.myPlacesConfirmDeleteDialogTitle'),
        message: this.$t('sections.myPlacesConfirmDeleteDialogMessage', { name: event.item.name }),
        cancelButtonText: this.$t('common.no'),
        okButtonText: this.$t('common.yes')
      }).then(async result => {
        // If "yes"
        if (result) {
          try {
            LoadingIndicator.show()
    
            await this.$store.dispatch('userPlace/delete', event.item.id)
    
            LoadingIndicator.hide()

            Toast.makeText(this.$t('sections.myPlacesDeleteDialogMessage')).show()
    
          } catch (ex) {
            LoadingIndicator.hide()
            alert(ErrorFormatter(ex))
          }
        }
      })
    }
  }
}
</script>