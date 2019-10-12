<template>
  <Page>
    <ScrollView>
      <StackLayout>
        <Label horizontalAlignment="center" class="title">{{ $t('sections.myContactsPickNumber') }}</Label>
        
        <ListView for="number in phoneNumbers" @itemTap="pickNumber">
          <v-template>
            <Label class="item">{{ number.value }}</Label>
          </v-template>
        </ListView>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<style lang="scss" scoped>
StackLayout {
  width: 100%;
  height: 100%;
}

.title {
  margin: 10 0;
  font-size: 18;
  color: #111111;
}

.item {
  margin: 5;
  padding: 5 10;
  font-size: 14;
}
</style>

<script>
export default {
  props: {
    phoneNumbers: Array
  },

  methods: {
    pickNumber (event) { 
      this.$modal.close(event.item.value)
    }
  }
}
</script>