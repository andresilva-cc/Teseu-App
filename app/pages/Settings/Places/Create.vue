<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.addPlace')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <Label textWrap="true" class="message">{{ $t('sections.myPlacesMessage') }}</Label>

        <StackLayout class="field">
          <TextField :hint="$t('fields.name')" v-model="data.name" />
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

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.distance') }}</Label>
          <Slider minValue="100" maxValue="1000" v-model="data.radius" />
          <Label class="text-center">{{ data.radius }} {{ $t('fields.meters') }}</Label>
        </StackLayout>

        <StackLayout class="field">
          <Label class="categories hint">{{ $t('fields.alertCategories') }}</Label>
          <CheckBox v-for="category in data.categories" :key="category.id" :checked="category.enabled" @checkedChange="category.enabled = $event.value" :text="category.name" fillColor="#2196f3" />
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

.map {
  height: 250
}

.fab {
  width: 50;
  height: 50;
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
import { Marker, Position } from 'nativescript-google-maps-sdk'
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import Error from '~/utils/error'
import PickLocation from '~/components/PickLocation'

export default {
  async created () {
    try {
      LoadingIndicator.show()

      // Fetch categories
      await this.$store.dispatch('category/fetch')
      this.data.categories = this.$store.getters['category/get']
      this.data.categories.forEach(category => {
        category.enabled = true
      })

      LoadingIndicator.hide()

    } catch (ex) {
      LoadingIndicator.hide()
      alert(ErrorFormatter(ex))
    }
  },

  data () {
    return {
      data: {
        name: '',
        radius: 500,
        categories: []
      },

      mapView: null,

      map: {
        latitude: 0,
        longitude: 0,
        zoom: 17,
      },

      marker: null
    }
  },

  methods: {
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

    async add () {
      try {
        LoadingIndicator.show()

        const place = {
          name: this.data.name,
          radius: this.data.radius,
          location: {
            coordinates: []
          },
          categories: []
        }

        place.location.coordinates.push(this.map.latitude)
        place.location.coordinates.push(this.map.longitude)

        this.data.categories.forEach(category => {
          if (category.enabled)
            place.categories.push({ categoryId: category.id })
        })

        if (place.categories.length === 0) {
          throw new Error('MinimumOneCategoryError')
        }

        await this.$store.dispatch('userPlace/create', place)

        LoadingIndicator.hide()

        alert({
          title: this.$t('sections.myPlacesAddDialogTitle'),
          message: this.$t('sections.myPlacesAddDialogMessage'),
          okButtonText: this.$t('common.ok')
        })

        this.$navigateBack()

      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>