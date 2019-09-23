<template>
  <Page actionBarHidden="true" androidStatusBarBackground="#2196f3">
    <RadSideDrawer ref="drawer">

      <!-- Drawer Content -->
      <GridLayout rows="auto, auto, *, auto" columns="*" class="drawer" ~drawerContent>

        <!-- User Info -->
        <GridLayout rows="auto, auto" columns="auto, *" row="0" column="0" backgroundColor="#bbdefb" class="user-info">
          <Image src="~/resources/images/user.png" row="0" col="0" rowSpan="2"></Image>
          <Label row="0" col="1">{{ user.username }}</Label>
          <Label row="1" col="1" class="phone">{{ user.phone | phone }}</Label>
        </GridLayout>

        <!-- Menu Items -->
        <GridLayout rows="auto, auto, auto" columns="25, *" row="1" column="0" class="menu-list">
          <Label class="fa" row="0" column="0" verticalAlignment="center">&#xf0c0;</Label>
          <Label class="item" row="0" column="1">{{ $t('common.menuContacts') }}</Label>

          <Label class="fa" row="1" column="0" verticalAlignment="center">&#xf041;</Label>
          <Label class="item" row="1" column="1">{{ $t('common.menuPlaces') }}</Label>

          <Label class="fa" row="2" column="0" verticalAlignment="center">&#xf0f3;</Label>
          <Label class="item" row="2" column="1">{{ $t('common.menuAlerts') }}</Label>
        </GridLayout>

        <!-- Logout -->
        <Label row="3" column="0" class="logout" @tap="logout">{{ $t('common.menuLogout') }}</Label>

      </GridLayout>

      <GridLayout rows="auto, *, auto, auto" columns="*, auto" ~mainContent>
        <!-- Map -->
        <MapView row="0" col="0" rowSpan="4" colSpan="2"></MapView>

        <!-- Search bar -->
        <Label row="0" col="0" colSpan="2" class="search-bar" @tap="showDrawer">
          <FormattedString>
            <Span class="fa" text.decode="&#xf0c9;" />
            <Span text="   " />
            <Span :text="$t('common.searchPlacesPlaceholder')" />
          </FormattedString>
        </Label>

        <!-- FAB -->
        <fab row="2" col="1" icon="~/resources/images/icons/add_white.png" class="fab" />

        <!-- Last update -->
        <Label row="3" col="0" colSpan="2" class="last-update">{{ $t('common.lastSuccessfulUpdate', { time: '1 min' }) }}</Label>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<style lang="scss" scoped>
.drawer {
  background-color: #ffffff;
  color: #111111;
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
    margin: 10 15;

    .item {
      margin-bottom: 15;
      margin-left: 10;
    }

    .fa {
      margin-bottom: 15;
      text-align: center;
      font-size: 20;
    }
  }

  .logout {
    width: 100%;
    padding: 10;
    background-color: #f44336;
    color: #ffffff;
    text-align: center;
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

.fab {
  height: 60;
  width: 60;
  margin: 15;
  background-color: #1565c0;
}

.last-update {
  width: 100%;
  padding: 3;
  background-color: #2196f3;
  opacity: 0.75;
  color: #ffffff;
  text-align: center;
}
</style>

<script>
  import ErrorFormatter from '../utils/error_formatter'
  import WelcomePage from './Welcome'

  export default {
    computed: {
      user () {
        return this.$store.getters['auth/getUser']
      }
    },

    methods: {
      showDrawer () {
        this.$refs.drawer.showDrawer()
      },

      async logout () {
        try {
          await this.$store.commit('auth/logout')
          this.$navigateTo(WelcomePage, { clearHistory: true })
        } catch (ex) {
          if (ex.name) {
            alert(ErrorFormatter(ex))
          }
        }
      }
    }
  }
</script>
