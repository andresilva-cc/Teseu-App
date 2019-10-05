<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.myContacts')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateTo(MapPage, { clearHistory: true })"></NavigationButton>
    </ActionBar>

    <StackLayout>
      <Label textWrap="true" horizontalAlignment="center" class="message">{{ $t('sections.myContactsMessage') }}</Label>
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
        <fab row="1" columns="0" icon="~/resources/images/icons/add_white.png" class="fab" @tap="pickContact"/>

      </GridLayout>
    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
.message {
  padding: 5 15 15 15;
  border-width: 0 0 1 0;
  border-color: #cccccc;
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
import PhoneParser from '../../../services/phone_parser'
import Contacts from 'nativescript-contacts'
import Permissions from 'nativescript-permissions'
import CreateContactPage from './Create'
import MapPage from '../../Map'
import Error from '../../../utils/error'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      await this.$store.dispatch('userContact/fetch')

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      MapPage
    }
  },

  computed: {
    userContacts () {
      return this.$store.getters['userContact/get']
    }
  },

  methods: {
    async pickContact () {
      try {
        // Ask for permissions
        await Permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, this.$t('permissions.readContacts'))
        
        // Pick a contact
        const result = await Contacts.getContact()

        // If user picked a contact
        if (result.response === 'selected') {
          
          // Get contact
          const contact = result.data

          // If contact doesn't have any phone numbers
          if (contact.phoneNumbers.length === 0) {
            alert({
              title: this.$t('sections.myContactsNoPhoneDialogTitle'),
              message: this.$t('sections.myContactsNoPhoneDialogMessage'),
              okButtonText: this.$t('common.ok')
            })
          
          // If contact has more than 1 phone number
          // TODO: Choose from multiple phone numbers
          } else if (contact.phoneNumbers.length > 1) {
            alert({
              title: this.$t('sections.myContactsMultiplePhonesDialogTitle'),
              message: this.$t('sections.myContactsMultiplePhonesDialogMessage', {
                quantity: contact.phoneNumbers.length
              }),
              okButtonText: this.$t('common.ok')
            })
            
            // If contact has 1 phone number only
          } else if (contact.phoneNumbers.length === 1) {
            const parsedPhone = PhoneParser(contact.phoneNumbers[0].value, this.$store.getters['auth/getUser'].phone)

            // If couldn't parse phone
            if (!parsedPhone) {
              alert({
                title: this.$t('sections.myContactsUnsupportedFormatDialogTitle'),
                message: this.$t('sections.myContactsUnsupportedFormatDialogMessage'),
                okButtonText: this.$t('common.ok')
              }).then(() => {
                this.$navigateTo(CreateContactPage, {
                  props: {
                    contact
                  }
                })
              })

              return 
            }

            // Format phone number
            const formattedPhone = this.$options.filters.phone(parsedPhone)

            // Ask if the number is correct
            confirm({
              title: this.$t('sections.myContactsConfirmPhoneDialogTitle'),
              message: this.$t('sections.myContactsConfirmPhoneDialogMessage', {
                name: contact.name.given,
                phone: formattedPhone
              }),
              cancelButtonText: this.$t('common.no'),
              okButtonText: this.$t('common.yes')
            }).then(async result => {
              try {
                // If not correct, go to Create page
                if (!result) {
                  this.$navigateTo(CreateContactPage, {
                    props: {
                      contact,
                      placeholderPhone: formattedPhone
                    }
                  })

                // If correct, save it to database
                } else {
                  LoadingIndicator.show()

                  await this.$store.dispatch('userContact/create', {
                    name: contact.name.given,
                    phone: parsedPhone
                  })

                  LoadingIndicator.hide()

                  alert({
                    title: this.$t('sections.myContactsAddDialogTitle'),
                    message: this.$t('sections.myContactsAddDialogMessage'),
                    okButtonText: this.$t('common.ok')
                  })
                }

              } catch (ex) {
                LoadingIndicator.hide()

                if (ex.validator === 'not_unique')
                  alert(ErrorFormatter(new Error('DuplicateContactError')))
                else
                  alert(ErrorFormatter(ex))
              }
            })
          }
        } 
        
      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>