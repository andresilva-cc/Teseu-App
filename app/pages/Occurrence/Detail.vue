<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.registerOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <Label textWrap="true" class="message">{{ $t('sections.detailOccurrenceMessage') }}</Label>

        <StackLayout class="field border-bottom">
          <Label class="hint">{{ $t('fields.who') }}</Label>
          <DropDown itemsPadding="10 15" :items="whoOptions" selectedIndex="0" @selectedIndexChanged="whoDropdownIndexChanged" ref="whoDropdown" />
        </StackLayout>

        <StackLayout class="field border-bottom">
          <Label class="hint">{{ $t('fields.when') }}</Label>
          <DropDown itemsPadding="10 15" :items="whenOptions" selectedIndex="0" @selectedIndexChanged="whenDropdownIndexChanged" ref="whenDropdown" />
        </StackLayout>

        <StackLayout class="field border-bottom">
          <Label class="hint">{{ $t('fields.category') }}</Label>
          <DropDown itemsPadding="10 15" :items="categoryOptions" @selectedIndexChanged="categoryDropdownIndexChanged" ref="categoryDropdown" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.description') }}</Label>
          <TextView maxLength="1000" autocorrect="true" v-model="data.description" />
        </StackLayout>

        <StackLayout class="field">
          <CheckBox :checked="data.notifyContacts" @checkedChange="data.notifyContacts = $event.value" :text="$t('fields.notifyContacts')" fillColor="#2196f3" />
        </StackLayout>

        <GridLayout rows="auto, *, auto" columns="*, auto" class="map field">
          <Label row="0" column="0" colSpan="2" class="hint">{{ $t('fields.location') }}</Label>
          <MapView
            row="1" col="0" rowSpan="2" colSpan="2"
            :latitude="map.latitude"
            :longitude="map.longitude"
            :zoom="map.zoom"
            @mapReady="mapReady"
          />
          <fab row="2" col="1" icon="~/resources/images/icons/edit_white.png" class="fab" @tap="pickLocation" />
        </GridLayout>

        <Button :text="$t('common.register')" class="primary" @tap="register" />
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

.border-bottom {
  border-width: 0 0 1 0;
  border-color: #cccccc;
}

CheckBox {
  margin: 5 0;
}

.map {
  height: 250
}

.fab {
  width: 50;
  height: 50;
}

Button {
  margin: 20 0;
}
</style>

<script>
import { Marker, Position } from 'nativescript-google-maps-sdk'
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import { ValueList } from 'nativescript-drop-down'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import Error from '~/utils/error'
import PickLocation from '~/components/PickLocation'
import MapPage from '~/pages/Map'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      // Fetch categories
      await this.$store.dispatch('category/fetch')

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      data: {
        victim: true,
        when: 0,
        categoryId: null,
        description: '',
        notifyContacts: true,
        location: {
          coordinates: []
        },
        attachment: null
      },

      whoOptions: [
        this.$t('sections.detailOccurrenceVictim'),
        this.$t('sections.detailOccurrenceNotVictim')
      ],

      whenOptions: [
        this.$t('sections.detailOccurrenceWhenNow'),
        this.$t('sections.detailOccurrenceWhenHalfHourAgo'),
        this.$t('sections.detailOccurrenceWhenMoreThanAHourAgo')
      ],

      mapView: null,

      map: {
        latitude: 0,
        longitude: 0,
        zoom: 17,
      },

      marker: null
    }
  },

  computed: {
    categories () {
      return this.$store.getters['category/get']
    },

    categoryOptions () {
      return new ValueList(
        this.categories.map(category => {
          return {
            value: category.id,
            display: category.name
          }
        })
      )
    }
  },

  methods: {
    whoDropdownIndexChanged () {
      this.data.victim = this.$refs.whoDropdown.nativeView.selectedIndex === 0
    },

    whenDropdownIndexChanged () {
      this.data.when = this.$refs.whenDropdown.nativeView.selectedIndex
    },

    categoryDropdownIndexChanged () {
      this.data.categoryId = this.categoryOptions.getValue(this.$refs.categoryDropdown.nativeView.selectedIndex)
    },

    async mapReady (args) {
      try {
        // Get map view
        this.mapView = args.object

        // Set map settings
        this.mapView.settings.rotateGesturesEnabled = false
        this.mapView.settings.scrollGesturesEnabled = false
        this.mapView.settings.tiltGesturesEnabled = false
        this.mapView.settings.zoomGesturesEnabled = false

        // Ask for location permission
        await geolocation.enableLocationRequest(true, true)

        // Check if location is enabled
        const isEnabled = await geolocation.isEnabled()

        // If enabled, get current location
        if (isEnabled) {
          const { latitude, longitude } = await geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high
          })

          // Update map location
          this.map.latitude = latitude
          this.map.longitude = longitude

          // Create marker and add it to the map
          this.marker = new Marker()
          this.marker.position = Position.positionFromLatLng(this.map.latitude, this.map.longitude)
          this.mapView.addMarker(this.marker)
        }

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async pickLocation () {
      try {
        // Show modal with current location
        const coordinates = await this.$showModal(PickLocation, {
          props: {
            latitude: this.map.latitude,
            longitude: this.map.longitude
          }
        })

        // Update latitude and longitude
        if (coordinates) {
          this.map.latitude = coordinates.latitude
          this.map.longitude = coordinates.longitude
          this.marker.position = Position.positionFromLatLng(this.map.latitude, this.map.longitude)
        }
        
      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async register () {
      try {
        LoadingIndicator.show()

        this.data.location.coordinates.push(this.map.latitude)
        this.data.location.coordinates.push(this.map.longitude)

        await this.$store.dispatch('occurrence/create', this.data)

        LoadingIndicator.hide()

        alert({
          title: this.$t('sections.detailOccurrenceRegisterDialogTitle'),
          message: this.$t('sections.detailOccurrenceRegisterDialogMessage'),
          okButtonText: this.$t('common.ok')
        })

        this.$navigateTo(MapPage, { clearHistory: true })

      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>