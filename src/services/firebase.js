import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDroFw4pH1W3X1S1R6xY1bAKC2QOeavVW8',
  authDomain: 'santasofia-76aa4.firebaseapp.com',
  projectId: 'santasofia-76aa4',
  storageBucket: 'santasofia-76aa4.appspot.com',
  messagingSenderId: '661932669513',
  appId: '1:661932669513:web:2603c1133fb2aa43355d98',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
db.settings({ merge: true });
const auth = firebase.auth();
firebase.firestore().settings({ experimentalForceLongPolling: true });
export { db, auth };
