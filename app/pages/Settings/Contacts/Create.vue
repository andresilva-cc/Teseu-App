<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.addContact')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <Label textWrap="true" class="message">{{ $t('sections.myContactsCreateMessage') }}</Label>

        <StackLayout class="field">
          <TextField :hint="$t('fields.name')" v-model="name" />
        </StackLayout>

        <StackLayout class="field">
          <MaskedTextField ref="phone" :hint="$t('fields.phone')" keyboardType="phone" mask="(99) 99999-9999" />
          <Label class="hint">{{ $t('sections.myContactsImportedNumber') }} {{ contact.phoneNumbers[0].value }}</Label>
        </StackLayout>

        <Button :text="$t('common.add')" class="primary" @tap="add" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style lang="scss" scoped>
.message {
  margin-top: 15;
}

.field {
  margin-top: 10;
  font-size: 18;
  color: #111111;
  padding: 10 0;
}

.hint {
  color: #666666;
  font-size: 14;
}

Button {
  margin: 30 0;
}
</style>

<script>
import LoadingIndicator from '../../../utils/loading_indicator'
import ErrorFormatter from '../../../utils/error_formatter'
import ListContactsPage from './List'
import Error from '../../../utils/error'

export default {
  mounted () {
    this.name = this.contact.name.given

    if (this.placeholderPhone) {
      this.phone = this.placeholderPhone
      this.$refs.phone.nativeView.text = this.placeholderPhone
    }
  },

  props: {
    contact: Object,
    placeholderPhone: String
  },

  data () {
    return {
      name: '',
      phone: ''
    }
  },

  computed: {
    plainPhone () {
      return this.phone? `55${this.phone}` : ''
    }
  },

  methods: {
    async add () {
      try {
        LoadingIndicator.show()

        this.phone = this.$refs.phone.nativeView.text.replace(/[+()-\s]/g, '')
        await this.$store.dispatch('userContact/create', {
          name: this.name,
          phone: this.plainPhone
        })

        LoadingIndicator.hide()

        alert({
          title: this.$t('sections.myContactsAddDialogTitle'),
          message: this.$t('sections.myContactsAddDialogMessage'),
          okButtonText: this.$t('common.ok')
        })

        this.$navigateTo(ListContactsPage)

      } catch (ex) {
        LoadingIndicator.hide()
        
        if (ex.validator === 'not_unique') 
          alert(ErrorFormatter(new Error('DuplicateContactError')))
        else
          alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>