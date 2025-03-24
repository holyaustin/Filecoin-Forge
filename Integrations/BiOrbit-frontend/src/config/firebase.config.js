import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCBBPHX4No7v0uEW1Mi6hO0Vc19XrgZLR0',
	authDomain: 'bioorbit-dao.firebaseapp.com',
	projectId: 'bioorbit-dao',
	storageBucket: 'bioorbit-dao.appspot.com',
	messagingSenderId: '837804168934',
	appId: '1:837804168934:web:2894db35794b01d9c4cd27'
}

const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
