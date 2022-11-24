import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDGh_gjYbd8Phh_eL82J6MaaVcc6cZ7H-k',
  authDomain: 'trade-17317.firebaseapp.com',
  databaseURL: 'https://trade-17317-default-rtdb.firebaseio.com',
  projectId: 'trade-17317',
  storageBucket: 'trade-17317.appspot.com',
  messagingSenderId: '641298894441',
  appId: '1:641298894441:web:8ae2c7bcb4021972e0dcf8',
  measurementId: 'G-83X17E7TYE'
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
