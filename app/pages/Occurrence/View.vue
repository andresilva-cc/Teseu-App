<template>
  <Page androidStatusBarBackground="#2196f3">

    <ActionBar :title="$t('sections.viewOccurrence')" flat="true">
      <NavigationButton :text="$t('common.back')" android.systemIcon="ic_menu_back" @tap="$navigateBack"></NavigationButton>
    </ActionBar>

    <ScrollView>
      <StackLayout class="layout">

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.author') }}</Label>
          <TextField :text="occurrence.user.username" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.who') }}</Label>
          <TextField :text="who" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.when') }}</Label>
          <TextField :text="when" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.category') }}</Label>
          <TextField :text="occurrence.category.name" editable="false" />
        </StackLayout>

        <StackLayout class="field">
          <Label class="hint">{{ $t('fields.description') }}</Label>
          <TextView :text="occurrence.description" editable="false" />
        </StackLayout>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style lang="scss" scoped>
.field {
  margin-top: 10;
  font-size: 18;
  color: #111111;
  padding: 10 0;
}

.hint {
  color: #666666;
  font-size: 14;
}
</style>

<script>
import moment from 'moment'

export default {
  props: {
    occurrence: Object
  },

  computed: {
    who () {
      return this.occurrence.victim?
        this.$t('sections.viewOccurrenceVictim') : this.$t('sections.viewOccurrenceNotVictim')
    },

    when () {
      return this.$options.filters.capitalizeFirstLetter(moment(this.occurrence.when).fromNow())
    }
  }
}
</script>