<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.myContacts')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <GridLayout rows="*, auto" columns="*">
      
      <!-- Contacts list -->
      <ScrollView row="0" columns="0" rowSpan="2">
        <ListView for="contact in userContacts" v-if="userContacts.length > 0">
          <v-template>
            <StackLayout class="item">
              <Label class="name">{{ contact.name }}</Label>
              <Label class="radius">{{ contact.phone | phone }}</Label>
            </StackLayout>
          </v-template>
        </ListView>

        <StackLayout v-else class="no-results">
          <Label horizontalAlignment="center">{{ $t('sections.myContactsNoResults') }}</Label>
        </StackLayout>
      </ScrollView>

      <!-- FAB -->
      <fab row="1" columns="0" icon="~/resources/images/icons/add_white.png" class="fab" />

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

Label.phone {
  font-size: 14;
}
</style>

<script>
import LoadingIndicator from '../../../utils/loading_indicator'
import ErrorFormatter from '../../../utils/error_formatter'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      await this.$store.dispatch('userContact/fetch')

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      ErrorFormatter(ex)
    }
  },

  computed: {
    userContacts () {
      return this.$store.getters['userContact/get']
    }
  }
}
</script>