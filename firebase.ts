// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBwNpS8VZCOi82dvJDCOwra6dmzVpKMrwQ',
  authDomain: 'lookika-auth-otp.firebaseapp.com',
  projectId: 'lookika-auth-otp',
  storageBucket: 'lookika-auth-otp.firebasestorage.app',
  messagingSenderId: '197887879399',
  appId: '1:197887879399:web:3950d3650a94dab7141a42',
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
auth.useDeviceLanguage()

export { app, auth }
