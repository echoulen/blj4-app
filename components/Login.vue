<template>
  <div id="firebaseui-auth-container" />
</template>

<script lang="js">
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
}

export default {
  name: 'Login',
  data () {
    return {
      user: null
    }
  },
  mounted () {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style lang="scss" scoped>

</style>
