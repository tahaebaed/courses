import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCvLEJhGQ_sexzJJi_wyyQqbulIEa2BHTI',
  authDomain: 'course-details-2dea9.firebaseapp.com',
  projectId: 'course-details-2dea9',
  storageBucket: 'course-details-2dea9.appspot.com',
  messagingSenderId: '77334574839',
  appId: '1:77334574839:web:a7e2cc3534e5cc9b0185f2',
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore(app)
export const storage = getStorage(app)
