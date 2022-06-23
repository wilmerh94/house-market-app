/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: 'AIzaSyCB8LycpoRPzysKbL51Yo8MyDqg0Nucwd4',
 authDomain: 'house-market-1.firebaseapp.com',
 projectId: 'house-market-1',
 storageBucket: 'house-market-1.appspot.com',
 messagingSenderId: '710008416596',
 appId: '1:710008416596:web:f7c71d523dd858085f00c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
