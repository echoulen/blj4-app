<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 我大暖暖區</span>
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
