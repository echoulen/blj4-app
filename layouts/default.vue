<template>
  <v-app id="default-layout">
    <v-app-bar
      fixed
      app
      class="brown darken-1"
    >
      <v-toolbar-title
        class="grey--text text--lighten-5"
        v-text="title"
      />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed class="brown lighten-2">
      <span class="blue-grey--text text--lighten-5">&copy; 我大暖暖區</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'BLJ4 APP'
    }
  }
}
</script>

<style lang="scss">
  #default-layout {
    background: #424242 url("/bg.jpg") no-repeat;
    backface-visibility: visible;
    background-size: cover;
  }
</style>
