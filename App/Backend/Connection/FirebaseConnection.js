import firebase from 'firebase';

export function connectFirebase() {
  var firebaseConfig = {
    apiKey: "AIzaSyDUmkLCvM2SyvevYYbTr9sA6RTxbxnddpU",
    authDomain: "good-stuff-191fd.firebaseapp.com",
    databaseURL: "https://good-stuff-191fd.firebaseio.com",
    projectId: "good-stuff-191fd",
    storageBucket: "good-stuff-191fd.appspot.com",
    messagingSenderId: "400332779156",
    appId: "1:400332779156:web:ba12bdbbb3a81f542c8e81",
    measurementId: "G-Z8H3QJ3CV5"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}