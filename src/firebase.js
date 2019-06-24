import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAoZqFFjgd30ZaSBoCXhV4RsNU_rWtidDQ",
    authDomain: "manchestercity-a1d4c.firebaseapp.com",
    databaseURL: "https://manchestercity-a1d4c.firebaseio.com",
    projectId: "manchestercity-a1d4c",
    storageBucket: "gs://manchestercity-a1d4c.appspot.com",
    messagingSenderId: "243862560356",
    appId: "1:243862560356:web:2e11aa22b0dd53f4"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions')
  const firebaseTeams = firebaseDB.ref('teams')
  const firebasePlayers = firebaseDB.ref('players')

  export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
  }