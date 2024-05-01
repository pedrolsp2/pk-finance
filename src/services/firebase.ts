import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrvJaBS50DytKOSCMhxR10PP1BDeXYpX4',
  authDomain: 'pk-finances.firebaseapp.com',
  projectId: 'pk-finances',
  storageBucket: 'pk-finances.appspot.com',
  messagingSenderId: '12341109643',
  appId: '1:12341109643:web:821ea129684a2c04e3858e',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
