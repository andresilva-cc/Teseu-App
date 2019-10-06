<template>
  <Page>
    <ActionBar :title="$t('sections.pickLocation')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <GridLayout rows="*, auto" columns="*, auto">
      <MapView
        row="0" col="0" rowSpan="2" colSpan="2"
        :latitude="map.latitude"
        :longitude="map.longitude"
        :zoom="map.zoom"
        @mapReady="mapReady"
        @cameraMove="cameraMove"
      />
      <fab row="1" col="1" icon="~/resources/images/icons/check_white.png" class="fab" @tap="done" />
    </GridLayout>
  </Page>
</template>

<style lang="scss" scoped>
.fab {
  width: 50;
  height: 50;
}
</style>

<script>
import { Marker, Position } from 'nativescript-google-maps-sdk'
import ErrorFormatter from '~/utils/error_formatter'

export default {
  props: {
    latitude: Number,
    longitude: Number,
  },

  created () {
    this.map.latitude = this.latitude
    this.map.longitude = this.longitude
  },  

  data () {
    return {
      mapView: null,

      map: {
        latitude: 0,
        longitude: 0,
        zoom: 15
      },

      marker: null
    }
  },

  methods: {
    mapReady (args) {
      try {
        // Get map view
        this.mapView = args.object
  
        // Create marker and add it to the map
        this.marker = new Marker()
        this.marker.position = Position.positionFromLatLng(this.map.latitude, this.map.longitude)
        this.mapView.addMarker(this.marker)

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    cameraMove (args) {
      this.marker.position = Position.positionFromLatLng(args.camera.latitude, args.camera.longitude)
    },

    done () { 
      this.$modal.close({
        latitude: this.mapView.latitude,
        longitude: this.mapView.longitude
      })
    }
  }
}
</script>