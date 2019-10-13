<template>
  <Page>
    <StackLayout class="layout">
      <Label horizontalAlignment="center" class="title">{{ $t('sections.reportOccurrence') }}</Label>
      
      <StackLayout class="field">
        <Label class="hint">{{ $t('fields.description') }}</Label>
        <TextView maxLength="1000" autocorrect="true" :hint="$t('sections.reportOccurrenceDescriptionHint')"  v-model="description" />
      </StackLayout>

      <Button :text="$t('common.send')" class="primary" @tap="sendReport" />

    </StackLayout>
  </Page>
</template>

<style lang="scss" scoped>
.layout {
  height: auto;
  width: 100%;
  padding: 5 15 15 15;
}

.title {
  margin-top: 15;
  font-size: 18;
  color: #111111;
}

.field {
  height: auto;
  margin-top: 15;
  font-size: 18;
  color: #111111;
  padding: 10 0;
}

.hint {
  color: #666666;
  font-size: 14;
}

Button {
  margin-top: 15;
}
</style>

<script>
import * as Toast from 'nativescript-toast'
import LoadingIndicator from '~/utils/loading_indicator'
import ErrorFormatter from '~/utils/error_formatter'

export default {
  props: {
    occurrenceId: Number
  },

  data () {
    return {
      description: ''
    }
  },

  methods: {
    sendReport () { 
      try {
        LoadingIndicator.show()

        this.$store.dispatch('occurrenceReport/create', {
          occurrenceId: this.occurrenceId,
          description: this.description
        })

        LoadingIndicator.hide()

        Toast.makeText(this.$t('sections.reportOccurrenceSendSuccess')).show()

        this.$modal.close()

      } catch (ex) {
        alert(ErrorFormatter(ex))
      }
    }
  }
}
</script>