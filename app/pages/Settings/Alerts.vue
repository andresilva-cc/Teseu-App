<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.alerts')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <Label textWrap="true" class="message">{{ $t('sections.alertsMessage') }}</Label>

        <StackLayout rows="auto, auto" columns="*" class="field border-bottom">
          <Label class="hint">{{ $t('fields.alerts') }}</Label>
          <DropDown itemsPadding="10 15" :items="alertOptions" selectedIndex="1" @selectedIndexChanged="alertDropdownIndexChanged" ref="alertDropdown" />
        </StackLayout>

        <StackLayout rows="auto, auto" columns="*" class="field border-bottom">
          <Label class="hint">{{ $t('fields.alertFrequency') }}</Label>
          <DropDown itemsPadding="10 15" :items="frequencyList" selectedIndex="1" @selectedIndexChanged="frequencyDropdownIndexChanged" ref="frequencyDropdown" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.alertRadius') }}</Label>
          <Slider minValue="100" maxValue="1000" v-model="data.radius" />
          <Label class="text-center">{{ data.radius }} {{ $t('fields.meters') }}</Label>
        </StackLayout>

        <StackLayout class="field">
          <Label class="categories hint">{{ $t('fields.alertCategories') }}</Label>
          <CheckBox v-for="category in data.categories" :key="category.id" :checked="category.enabled" @checkedChange="category.enabled = $event.value" :text="category.name" fillColor="#2196f3" />
        </StackLayout>

        <Button :text="$t('common.save')" class="primary" @tap="save" />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style lang="scss" scoped>
.message {
  margin-top: 15;
}

.field {
  margin-top: 30;
  font-size: 18;
  color: #111111;
  padding: 10 0;
}

.hint {
  color: #666666;
  font-size: 14;
}

.categories.hint {
  margin-bottom: 10;
}

.border-bottom {
  border-width: 0 0 1 0;
  border-color: #cccccc;
}

Slider {
  margin: 10 0;
  color: #111111;
  background-color: #666666;
}

CheckBox {
  margin: 5 0;
}

Button {
  margin: 20 0;
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      // Fetch categories
      await this.$store.dispatch('category/fetch')
      this.data.categories = this.$store.getters['category/get']
      this.data.categories.forEach(category => {
        category.enabled = false
      })

      // Fetch user settings
      await this.$store.dispatch('userSettings/get')

      // Update UI
      this.setSettings(this.userSettings)

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      data: {
        enableNotifications: true,
        frequency: 1,
        radius: 500,
        categories: []
      },

      alertOptions: [
        this.$t('sections.alertsOnlyWhenAppIsOpened'),
        this.$t('sections.alertsEvenWhenAppIsClosed')
      ],

      frequencyList: [
        '1 minuto',
        '5 minutos',
        '15 minutos',
        '30 minutos',
        '1 hora'
      ]
    }
  },

  computed: {
    userSettings () {
      return this.$store.getters['userSettings/get']
    }
  },

  methods: {
    alertDropdownIndexChanged () {
      this.data.enableNotifications = this.$refs.alertDropdown.nativeView.selectedIndex === 1
    },

    frequencyDropdownIndexChanged () {
      this.data.frequency = this.$refs.frequencyDropdown.nativeView.selectedIndex
    },

    setCategoryChecked (categoryId, checked) {
      this.data.categories.forEach(category => {
        if (category.id === categoryId)
          category.enabled = checked
      })
    },

    setSettings (settings) {
      this.data.enableNotifications = settings.enableNotifications
      this.$refs.alertDropdown.nativeView.selectedIndex = this.data.enableNotifications? 1 : 0

      this.data.radius = settings.radius

      switch (settings.frequency) {
        case 1:
          this.data.frequency = 0
          break
        case 5:
          this.data.frequency = 1
          break
        case 15:
          this.data.frequency = 2
          break
        case 30:
          this.data.frequency = 3
          break
        case 60:
          this.data.frequency = 4
          break
      }
      this.$refs.frequencyDropdown.nativeView.selectedIndex = this.data.frequency

      settings.categories.forEach(category => {
        this.setCategoryChecked(category.categoryId, true)
      })
    },

    async save () {
      try {
        LoadingIndicator.show()

        const settings = {
          enableNotifications: this.data.enableNotifications,
          radius: this.data.radius,
          categories: []
        }

        switch (this.data.frequency) {
          case 0:
            settings.frequency = 1
            break
          case 1:
            settings.frequency = 5
            break
          case 2:
            settings.frequency = 15
            break
          case 3:
            settings.frequency = 30
            break
          case 4:
            settings.frequency = 60
            break
        }

        this.data.categories.forEach(category => {
          if (category.enabled)
            settings.categories.push({ id: category.id })
        })

        await this.$store.dispatch('userSettings/set', settings)

        LoadingIndicator.hide()

        alert({
          title: this.$t('sections.alertsSaveDialogTitle'),
          message: this.$t('sections.alertsSaveDialogMessage'),
          okButtonText: this.$t('common.ok')
        })

      } catch (ex) {
        LoadingIndicator.hide()
        if (ex.name) {
          alert(ErrorFormatter(ex))
        }
      }
    }
  }
}
</script>