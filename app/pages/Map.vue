<template>
  <Page actionBarHidden="true" androidStatusBarBackground="#2196f3">
    <StackLayout>
      <Label>Token test: {{ test }}</Label>
      <Button :text="$t('auth.logout')" @tap="logout" />
    </StackLayout>
  </Page>
</template>

<script>
  import ErrorFormatter from '../utils/error_formatter'
  import WelcomePage from './Welcome'
  import api from '../api'

  export default {
    mounted () {
      api.get('/user/settings')
        .then(res => {
          this.test = 'Ok'
        })
        .catch (ex => {
          this.test = 'Error ' + ex.response.status
        })
    },

    data () {
      return {
        WelcomePage,

        test: 'Waiting...'
      }
    },

    methods: {
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
