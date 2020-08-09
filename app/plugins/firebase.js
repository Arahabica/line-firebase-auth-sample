import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
}
if (firebase.apps.length) {
  firebase.app()
} else {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth
const functions = firebase.app().functions('asia-northeast1')

export { auth,  functions }
