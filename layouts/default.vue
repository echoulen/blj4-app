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
      <span v-if="user" class="blue-grey--text text--lighten-5">Hi, {{ user.displayName }}</span>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      title: 'BLJ4 APP'
    }
  },
  computed: mapState({
    user: state => state.user
  })
}
</script>

<style lang="scss">
  #default-layout {
    background: #424242 url("/blj4-app/bg.jpg") no-repeat;
    backface-visibility: visible;
    background-size: cover;
  }
</style>
