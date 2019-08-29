import * as firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyDS3BPrM8w3cZTmYMgzazsukpP979ELvOw',
  authDomain: 'blj4-a0e08.firebaseapp.com'
})

let unsubscribe = null

export class AppContext {
  static subscribeUserState (store) {
    unsubscribe && unsubscribe()
    unsubscribe = firebase.auth().onAuthStateChanged(user => store.commit('setUser', user))
  }
}
