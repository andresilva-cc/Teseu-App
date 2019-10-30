<template>
  <Page actionBarHidden="true" :androidStatusBarBackground="statusBarBackground" @loaded="loaded" @unloaded="unloaded">
    <RadSideDrawer ref="drawer">

      <!-- Drawer Content -->
      <GridLayout rows="auto, *, auto" columns="*" class="drawer" ~drawerContent>

        <!-- User Info -->
        <GridLayout rows="auto, auto" columns="auto, *" row="0" column="0" backgroundColor="#bbdefb" class="user-info">
          <Image row="0" col="0" rowSpan="2" :src="`~/resources/images/badges/${user.level}.png`" class="badge" />
          <Label row="0" col="1" verticalAlignment="center">{{ user.username }}</Label>
          <Label row="1" col="1" class="phone" verticalAlignment="center">{{ user.phone | phone }}</Label>
        </GridLayout>

        <!-- Menu Items -->
        <ScrollView row="1" columns="0">
          <ListView for="item in menuItems" @itemTap="menuTap" separatorColor="#ffffff" class="menu-list">
            <v-template>
              <GridLayout rows="auto" columns="45, *" class="item">
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
        <MapView row="0" col="0" rowSpan="5" colSpan="2"
          :latitude="map.latitude"
          :longitude="map.longitude"
          :zoom="map.zoom"
          @mapReady="mapReady"
          @cameraChanged="cameraChanged"
          @markerSelect="markerSelect"
        />

        <GridLayout row="0" col="0" colSpan="2" rows="auto, auto" columns="*">
          <!-- Search bar -->
          <StackLayout row="0" col="0" class="search-bar-container" :class="{ 'red-background': emergencyModeEnabled }">
            
            <GridLayout rows="*" columns="auto, *" class="search-bar" :class="{ 'search-bar-places-list': placesListOpen }">
              <Label row="0" col="0" verticalAlignment="center" class="fas menu" @tap="showDrawer">&#xf0c9;</Label>
              <Label row="0" col="1" verticalAlignment="center" @tap="placesListOpen = !placesListOpen">{{ $t('common.searchPlacesPlaceholder') }}</Label>
            </GridLayout>
            <StackLayout class="places" v-if="placesListOpen">
              <ListView for="place in places" height="158" @itemTap="placesTap">
                <v-template if="$index === 0">
                  <GridLayout rows="*" columns="auto, auto, *, auto" class="item">
                    <Label row="0" column="0" verticalAlignment="center" class="fas icon">&#xf124;</Label>
                    <Label row="0" column="1" verticalAlignment="center" class="name">{{ place.name }}</Label>
                    <Label row="0" column="3" verticalAlignment="center" class="fas">&#xf054;</Label>
                  </GridLayout>
                </v-template>

                <v-template>
                  <GridLayout rows="*" columns="auto, *, auto" class="item">
                    <Label row="0" column="0" verticalAlignment="center" class="name">{{ place.name }}</Label>
                    <Label row="0" column="2" verticalAlignment="center" class="fas">&#xf054;</Label>
                  </GridLayout>
                </v-template>
              </ListView>
            </StackLayout>
          </StackLayout>

          <!-- Emergency Mode -->
          <GridLayout v-if="emergencyModeEnabled" row="1" column="0" rows="auto, auto" columns="auto, auto" class="emergency-mode" @tap="disableEmergencyMode">
            <Label row="0" col="0" rowSpan="2" verticalAlignment="center" class="fas">&#xf071;</Label>
            <Label row="0" col="1" verticalAlignment="center" textWrap="true" class="title">{{ $t('sections.emergencyMode') }}</Label>
            <Label row="1" col="1" verticalAlignment="center" textWrap="true">{{ $t('sections.emergencyModeDisable') }}</Label>
          </GridLayout>
        </GridLayout>

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

    .badge {
      height: 50;
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

.emergency-mode {
  padding: 20 20 30 20;
  background-color: #f44336;
  color: #ffffff;
  font-size: 18;

  .fas {
    font-size: 42;
    padding-right: 15;
  }

  .title {
    font-size: 26;
  }
}

.red-background {
  background-color: #f44336;
}

.search-bar-container {
  padding-top: 15;

  .places {
    width: 95%;
    background-color: #ffffff;
    border-radius: 0 0 10 10;

    .item {
      padding: 10 15;

      .icon {
        margin-right: 10;
        color: #444444;
      }

      .name {
        color: #111111;
      }
    }
  }
}

.search-bar {
  width: 95%;
  font-size: 18;
  padding: 10 15;
  border-radius: 10;
  background-color: #ffffff;

  .menu {
    padding-top: 4;
    margin-right: 15;
  }
}

.search-bar-places-list {
  border-radius: 10 10 0 0;
  border-width: 0 0 1 0;
  border-color: #cccccc;
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
import * as Toast from 'nativescript-toast'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'
import { Position, Marker } from 'nativescript-google-maps-sdk'
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'
import WelcomePage from './Welcome'
import RegisterOccurrencePage from './Occurrence/Register'
import ViewOccurrencePage from './Occurrence/View'
import AlertsPage from './Settings/Alerts'
import MyContactsPage from './Settings/Contacts/List'
import MyPlacesPage from './Settings/Places/List'
const Timer = require('tns-core-modules/timer')
const firebase = require('nativescript-plugin-firebase')
import moment from 'moment'
import { Image } from 'tns-core-modules/ui/image'
import { ImageSource } from 'tns-core-modules/image-source'
import * as ApplicationSettings from 'application-settings'

export default {
  data () {
    return {
      // UI related data
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

      placesListOpen: false,

      // Tracking data
      watchId: 0,
      timerId: null,
      tracking: false,

      currentLocation: {
        latitude: 0,
        longitude: 0
      },

      // Map related data
      mapView: null,
      map: {
        latitude: 0,
        longitude: 0,
        zoom: 17,
      },
      nearbyOccurrencesMarkers: [],
    }
  },

  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },

    user () {
      return this.$store.getters['auth/getUser']
    },

    userSettings () {
      return this.$store.getters['userSettings/get']
    },

    userPlaces () {
      return this.$store.getters['userPlace/get']
    },

    places () {
      let places = this.$store.getters['userPlace/get'].slice()
      places.splice(0, 0, {
        name: 'Localização atual'
      })

      return places
    },

    emergencyModeEnabled () {
      return this.$store.getters['emergencyMode/isEnabled']
    },

    statusBarBackground () {
      return this.emergencyModeEnabled? '#f44336' : '#2196f3'
    },

    lastUpdateAt () {
      if (this.$store.getters['occurrence/isSyncing'])
        return 'Sincronizando...'
      
      return `${this.$t('common.lastSuccessfulUpdate')} ${this.$store.getters['occurrence/getLastUpdateAt'].fromNow()}`
    },

    updateInterval () {
      if (this.userSettings.frequency)
        return this.userSettings.frequency * 60000

      return 60000
    }
  },

  methods: {
    async loaded (args) {
      try {
        if (this.isAuthenticated) {
          LoadingIndicator.show()

          const token = await firebase.getCurrentPushToken()
          await this.$store.dispatch('user/updateFCMToken', token)
          
          await this.$store.dispatch('userPlace/fetch')

          await this.$store.dispatch('emergencyMode/check')

          await this.$store.dispatch('auth/updateLevel')

          LoadingIndicator.hide()

          if (!ApplicationSettings.hasKey('disableTutorial'))
            this.showTutorial()
        }
  
        if (!this.tracking)
          await this.startTracking()


      } catch (ex) {
        LoadingIndicator.hide()
        alert(ErrorFormatter(ex))
      }
    },

    unloaded (args) {
      try {
        // Stop timer and location watcher when page is unloaded
        this.tracking = false
        geolocation.clearWatch(this.watchId)
        Timer.clearInterval(this.timerId)

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    askForAuthentication () {
      confirm({
        title: this.$t('auth.authenticationRequired'),
        message: this.$t('auth.authenticationRequiredDescription'),
        cancelButtonText: this.$t('common.no'),
        okButtonText: this.$t('common.yes')
      }).then(async result => {
        if (result) 
          this.$navigateTo(WelcomePage, { clearHistory: true })
      })
    },

    async startTracking () {
      try {
        this.tracking = true

        // Get user settings
        if (this.isAuthenticated)
          await this.$store.dispatch('userSettings/get')
        

        // Start location watch
        this.watchLocation()
        
        // Set timer
        this.setTimer()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    showDrawer () {
      this.$refs.drawer.showDrawer()
    },

    menuTap (event) {
      if (this.isAuthenticated)
        this.$navigateTo(this.pages[event.item.to])
      else
        this.askForAuthentication()
    },

    async placesTap (event) {
      try {
        // Update map coordinates
        if (event.index === 0) {
          this.mapView.latitude = this.currentLocation.latitude
          this.mapView.longitude = this.currentLocation.longitude
        } else {
          this.mapView.latitude = event.item.location.coordinates[0]
          this.mapView.longitude = event.item.location.coordinates[1]
        }

        this.mapView.zoom = 17

        this.mapView.updateCamera()
  
        // Close places list
        this.placesListOpen = false

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    iconFromCode (code) {
      return String.fromCharCode(code)
    },

    async mapReady (args) {
      try {
        // Get map view
        this.mapView = args.object

        // Set map settings
        this.mapView.settings.rotateGesturesEnabled = false
        this.mapView.settings.tiltGesturesEnabled = false
        this.mapView.settings.compassEnabled = false
        this.mapView.settings.mapToolbarEnabled = false
        this.mapView.setStyle([
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ])

        // Start tracking
        if (!this.tracking)
          await this.startTracking()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async cameraChanged (args) {
      this.$store.commit('occurrence/setSyncing', true)

      const { latitude, longitude } = this.mapView

      if (latitude !== 0 && longitude !== 0) {
        Timer.setTimeout(() => {
          if (latitude === this.mapView.latitude && longitude === this.mapView.longitude) {
            this.updateMap()
          }
        }, 1000)
      }
    },

    markerSelect (args) {
      try {
        if (args.marker.userData)
          this.$navigateTo(ViewOccurrencePage, {
            props: {
              occurrence: args.marker.userData
            }
          })

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async updateMap () {
      try {
        this.$store.commit('occurrence/setSyncing', true)
  
        // Fetch nearby occurrences
        await this.$store.dispatch('occurrence/nearby', {
          coordinates: [
            this.mapView.latitude,
            this.mapView.longitude
          ]
        })
        
        // Update map
        if (this.mapView)
          this.updateNearbyOccurrencesMarkers()
          
      } catch (ex) {
        alert(ErrorFormatter(ex))   
             
      } finally {
        this.$store.commit('occurrence/setSyncing', false)
      }
    },

    setTimer () {
      this.timerId = Timer.setInterval(async () => {
        this.updateMap()
      }, this.updateInterval)
    },

    async watchLocation () {
      await geolocation.enableLocationRequest(true, true)

      try {
        this.watchId = geolocation.watchLocation(
          loc => {
            if (loc) {
              this.currentLocation.latitude = loc.latitude
              this.currentLocation.longitude = loc.longitude

              if (this.map.latitude === 0 && this.map.longitude === 0) {
                this.map.latitude = this.currentLocation.latitude
                this.map.longitude = this.currentLocation.longitude
              }
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

          const source = new ImageSource()
          source.fromResource(`category_${occurrence.categoryId}`)
          const icon = new Image()
          icon.imageSource = source

          marker.icon = icon

          marker.userData = occurrence

          this.nearbyOccurrencesMarkers.push(marker)
        })
  
        // Add new nearby occurrences markers
        this.nearbyOccurrencesMarkers.forEach(marker => {
          this.mapView.addMarker(marker)
        })

        if (this.nearbyOccurrencesMarkers.length === 0) {
          Toast.makeText(this.$t('sections.noOccurrences')).show()
        }

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    },

    async disableEmergencyMode () {
      confirm({
        title: this.$t('common.attention'),
        message: this.$t('sections.emergencyModeDisableDialogMessage'),
        cancelButtonText: this.$t('common.cancel'),
        okButtonText: this.$t('common.disable')
      }).then(async result => {
        if (result) {
          try {
            LoadingIndicator.show()
    
            await this.$store.dispatch('emergencyMode/disable')
    
            Toast.makeText(this.$t('sections.emergencyModeDisabled')).show()

            LoadingIndicator.hide()

          } catch (ex) {
            LoadingIndicator.hide()
            alert(ErrorFormatter(ex))
          }
        }
      })
    },

    async showTutorial () {
      await alert({
        title: this.$t('tutorial.welcomeTitle'),
        message: this.$t('tutorial.welcomeMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.notificationsTitle'),
        message: this.$t('tutorial.notificationsMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.contactsTitle'),
        message: this.$t('tutorial.contactsMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.placesTitle'),
        message: this.$t('tutorial.placesMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.alertsTitle'),
        message: this.$t('tutorial.alertsMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.detailOccurrenceTitle'),
        message: this.$t('tutorial.detailOccurrenceMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.emergencyModeTitle'),
        message: this.$t('tutorial.emergencyModeMessage'),
        okButtonText: this.$t('common.continue')
      })

      await alert({
        title: this.$t('tutorial.endTitle'),
        message: this.$t('tutorial.endMessage'),
        okButtonText: this.$t('common.continue')
      })

      ApplicationSettings.setBoolean('disableTutorial', true)
    },

    async logout () {
      confirm({
        title: this.$t('auth.logout'),
        message: this.$t('auth.logoutConfirm'),
        cancelButtonText: this.$t('common.cancel'),
        okButtonText: this.$t('auth.logout')
      }).then(async result => {
        if (result) {
          try {
            if (this.isAuthenticated) {
              await this.$store.dispatch('user/updateFCMToken', null)
              await this.$store.commit('auth/logout')
            }
            this.$navigateTo(WelcomePage, { clearHistory: true })

          } catch (ex) {
            alert(ErrorFormatter(ex))
          }
        }
      })
    }
  }
}
</script>
