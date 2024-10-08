import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCt6ckMfgFYhv3wiwK2Lrmz69DIyLWcm-0',
  authDomain: 'bakery-page.firebaseapp.com',
  projectId: 'bakery-page',
  storageBucket: 'bakery-page.appspot.com',
  messagingSenderId: '766885840314',
  appId: '1:766885840314:web:07ddde55374afac1560983',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore service
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp };
