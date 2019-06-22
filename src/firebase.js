import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAoZqFFjgd30ZaSBoCXhV4RsNU_rWtidDQ",
    authDomain: "manchestercity-a1d4c.firebaseapp.com",
    databaseURL: "https://manchestercity-a1d4c.firebaseio.com",
    projectId: "manchestercity-a1d4c",
    storageBucket: "",
    messagingSenderId: "243862560356",
    appId: "1:243862560356:web:2e11aa22b0dd53f4"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions')
  export {
    firebase,
    firebaseMatches,
    firebasePromotions
  }