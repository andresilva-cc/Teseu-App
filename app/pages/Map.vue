<template>
  <Page actionBarHidden="true" androidStatusBarBackground="#2196f3" @loaded="loaded" @unloaded="unloaded">
    <RadSideDrawer ref="drawer">

      <!-- Drawer Content -->
      <GridLayout rows="auto, *, auto" columns="*" class="drawer" ~drawerContent>

        <!-- User Info -->
        <GridLayout rows="auto, auto" columns="auto, *" row="0" column="0" backgroundColor="#bbdefb" class="user-info">
          <Image src="~/resources/images/user.png" row="0" col="0" rowSpan="2"></Image>
          <Label row="0" col="1">{{ user.username }}</Label>
          <Label row="1" col="1" class="phone">{{ user.phone | phone }}</Label>
        </GridLayout>

        <!-- Menu Items -->
        <ScrollView row="1" columns="0">
          <ListView for="item in menuItems" @itemTap="menuTap" separatorColor="#ffffff" class="menu-list">
            <v-template>
              <GridLayout rows="auto" columns="40, *" class="item">
                <Label row="0" column="0" verticalAlignment="center" class="fas">{{ iconFromCode(item.icon) }}</Label>
                <Label row="0" column="1" verticalAlignment="center">{{ item.title }}</Label>
              </GridLayout>
            </v-template>
          </ListView>
        </ScrollView>

        <!-- Logout -->
        <Label row="2" column="0" class="logout" @tap="logout">{{ $t('auth.logout') | uppercase }}</Label>

      </GridLayout>

      <!-- Main Content -->
      <GridLayout rows="auto, *, auto, auto" columns="*, auto" ~mainContent>

        <!-- Map -->
        <MapView row="0" col="0" rowSpan="4" colSpan="2"
          :latitude="map.latitude"
          :longitude="map.longitude"
          :zoom="map.zoom"
          :minZoom="map.minZoom"
          :maxZoom="map.maxZoom"
          @mapReady="mapReady"
          @markerSelect="markerSelect"
        />

        <!-- Search bar -->
        <Label row="0" col="0" colSpan="2" class="search-bar" @tap="showDrawer">
          <FormattedString>
            <Span class="fas" text.decode="&#xf0c9;" />
            <Span text="   " />
            <Span :text="$t('common.searchPlacesPlaceholder')" />
          </FormattedString>
        </Label>

        <!-- FAB -->
        <fab row="2" col="1" icon="~/resources/images/icons/add_white.png" class="fab" @tap="$navigateTo(pages[0])" />

        <!-- Last update -->
        <Label row="3" col="0" colSpan="2" class="last-update">{{ lastUpdateAt }}</Label>
      
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<style lang="scss" scoped>
.drawer {
  background-color: #ffffff;
  color: #333333;
  font-size: 18;

  .user-info {
    padding: 15;
    font-weight: bold;

    Image {
      width: 60;
      height: 60;
      margin-right: 15;
    }

    .phone {
      font-size: 14;
    }
  }

  .menu-list {
    margin: 10 0;

    .item {
      padding: 10 15;
    }

    .fas {
      padding-right: 15;
      text-align: center;
      font-size: 20;
      color: #444444;
    }
  }

  .logout {
    width: 100%;
    padding: 10;
    background-color: #f44336;
    color: #ffffff;
    text-align: center;
    font-size: 14;
  }
}

.search-bar {
  width: 95%;
  margin-top: 15;
  padding: 10 20;
  border-radius: 10;
  background-color: #ffffff;
  font-size: 18;
}

.last-update {
  width: 100%;
  padding: 3;
  background-color: #2196f3;
  opacity: 0.9;
  color: #ffffff;
  text-align: center;
}
</style>

<script>
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import { Position, Marker } from 'nativescript-google-maps-sdk'
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import WelcomePage from './Welcome'
import RegisterOccurrencePage from './Occurrence/Register'
import AlertsPage from './Settings/Alerts'
import MyContactsPage from './Settings/Contacts/List'
import MyPlacesPage from './Settings/Places/List'
const Timer = require('tns-core-modules/timer')
import moment from 'moment'

export default {
  data () {
    return {
      pages: [
        RegisterOccurrencePage,
        MyContactsPage,
        MyPlacesPage,
        AlertsPage
      ],

      menuItems: [
        { icon: '0xf0c0', title: this.$t('sections.myContacts'), to: 1 },
        { icon: '0xf3c5', title: this.$t('sections.myPlaces'), to: 2 },
        { icon: '0xf0f3', title: this.$t('sections.alerts'), to: 3 }
      ],

      watchId: 0,

      mapView: null,

      map: {
        latitude: 0,
        longitude: 0,
        zoom: 15,
        minZoom: 0,
        maxZoom: 22
      },

      nearbyOccurrencesMarkers: [],

      timerId: null
    }
  },

  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    },

    userSettings () {
      return this.$store.getters['userSettings/get']
    },

    lastUpdateAt () {
      if (this.$store.getters['occurrence/getLastUpdateAt'])
        return `${this.$t('common.lastSuccessfulUpdate')} ${this.$store.getters['occurrence/getLastUpdateAt'].fromNow()}`

      return 'Sincronizando...'
    },

    updateInterval () {
      if (this.userSettings.frequency)
        return this.userSettings.frequency * 60000

      return false
    }
  },

  methods: {
    async loaded (args) {
      // Get user settings
      await this.$store.dispatch('userSettings/get')
      
      // Ask for location permission
      await geolocation.enableLocationRequest(true, true)

      // Check if location is enabled
      const isEnabled = await geolocation.isEnabled()
      
      // If location is enabled
      if (isEnabled) {
        // Start location watch
        this.watchLocation()
        
        // Set timer
        this.setTimer()
      }
    },

    unloaded (args) {
      // Stop timer and location watcher when page is unloaded
      geolocation.clearWatch(this.watchId)
      Timer.clearInterval(this.timerId)
    },

    showDrawer () {
      this.$refs.drawer.showDrawer()
    },

    menuTap (event) {
      this.$navigateTo(this.pages[event.item.to])
    },

    iconFromCode (code) {
      return String.fromCharCode(code)
    },

    async mapReady (args) {
      try {
        // Get map view
        this.mapView = args.object

        // Ask for location permission
        await geolocation.enableLocationRequest(true, true)

        // Check if location is enabled
        const isEnabled = await geolocation.isEnabled()
        
        // If location is enabled
        if (isEnabled) {
        
          // Get first location
          const { latitude, longitude } = await geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high
          })
          this.map.latitude = latitude
          this.map.longitude = longitude

          // Fetch nearby occurrences for the first time
          await this.$store.dispatch('occurrence/nearby', {
            coordinates: [
              this.map.latitude,
              this.map.longitude
            ]
          })

          this.updateNearbyOccurrencesMarkers()
        }

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    markerSelect (args) {
      console.log('Selected: ' + args.marker.userData.id)
    },

    setTimer () {
      this.timerId = Timer.setInterval(async () => {
        try {
          // Fetch nearby occurrences
          await this.$store.dispatch('occurrence/nearby', {
            coordinates: [
              this.map.latitude,
              this.map.longitude
            ]
          })
          
          // Update map
          if (this.mapView)
            this.updateNearbyOccurrencesMarkers()

        } catch (ex) {
          alert(ErrorFormatter(ex))
        }

      }, this.updateInterval)
    },

    watchLocation () {
      try {
        this.watchId = geolocation.watchLocation(
          loc => {
            if (loc) {
              this.map.latitude = loc.latitude
              this.map.longitude = loc.longitude
            }
          },

          e => {
            alert(ErrorFormatter(e))
          },

          {
            desiredAccuracy: Accuracy.HIGH,
            updateDistance: 1,
            updateTime: 3000,
            minimumUpdateTime: 100
          }
        )

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    updateNearbyOccurrencesMarkers () {
      try {
        // Remove all nearby occurrences markers
        this.nearbyOccurrencesMarkers.forEach(marker => {
          this.mapView.removeMarker(marker)
        })
  
        // Empty nearby occurrences markers array
        this.nearbyOccurrencesMarkers = []

        // Get nearby occurrences
        const nearbyOccurrences = this.$store.getters['occurrence/getNearby']
  
        // Create a marker for each occurrence
        nearbyOccurrences.forEach(occurrence => {
          const marker = new Marker()

          marker.position = Position.positionFromLatLng(
            occurrence.location.coordinates[0],
            occurrence.location.coordinates[1]
          )

          marker.title = occurrence.description

          marker.userData = occurrence

          this.nearbyOccurrencesMarkers.push(marker)
        })
  
        // Add new nearby occurrences markers
        this.nearbyOccurrencesMarkers.forEach(marker => {
          this.mapView.addMarker(marker)
        })

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async logout () {
      try {
        confirm({
          title: this.$t('auth.logout'),
          message: this.$t('auth.logoutConfirm'),
          cancelButtonText: this.$t('common.cancel'),
          okButtonText: this.$t('auth.logout')
        }).then(async result => {
          if (result) {
            await this.$store.commit('auth/logout')
            this.$navigateTo(WelcomePage, { clearHistory: true })
          }
        })
      } catch (ex) {
        if (ex.name) {
          alert(ErrorFormatter(ex))
        }
      }
    }
  }
}
</script>
