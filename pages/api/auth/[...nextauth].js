import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"

import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "eucalyptus-89238.firebaseapp.com",
    projectId: "eucalyptus-89238",
    storageBucket: "eucalyptus-89238.appspot.com",
    messagingSenderId: "361281058778",
    appId: "1:361281058778:web:22e904010a4de6f5f432e3",
    measurementId: "G-R81JVSCLJD"
  };

const firestore = (
  firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
).firestore()

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: FirebaseAdapter(firestore),
})