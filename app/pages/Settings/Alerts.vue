<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.alerts')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <Label textWrap="true" class="message">{{ $t('sections.alertsMessage') }}</Label>

        <GridLayout rows="auto" columns="*, auto" class="field border-bottom">
          <Label row="0" column="0" verticalAlignment="center">{{ $t('fields.enableNotifications') }}</Label>
          <Switch row="0" column="1" class="positive" v-model="data.enableNotifications" />
        </GridLayout>

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
          <CheckBox v-for="category in categories" :key="category.id" :text="category.name" fillColor="#2196f3" />
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
import LoadingIndicator from '../../utils/loading_indicator'
import ErrorFormatter from '../../utils/error_formatter'

export default {
  data () {
    return {
      data: {
        enableNotifications: true,
        frequency: 1,
        radius: 500
      },

      frequencyList: [
        '1 minuto',
        '5 minutos',
        '15 minutos',
        '30 minutos',
        '1 hora'
      ],

      categories: [
        { id: 1, name: 'Categoria A' },
        { id: 2, name: 'Categoria B' },
        { id: 3, name: 'Categoria C' }
      ]
    }
  },

  methods: {
    frequencyDropdownIndexChanged () {
      this.data.frequency = this.$refs.frequencyDropdown.nativeView.selectedIndex
    },

    save () {
      try {
        LoadingIndicator.show()
        // this.$store.commit('auth/setUser', { phone: this.plainPhone })
        LoadingIndicator.hide()

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