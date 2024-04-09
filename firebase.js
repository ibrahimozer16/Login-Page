// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaKwf4MfpHTVLdSV_OHDyPeDgX7Bdo7fI",
  authDomain: "login-da14b.firebaseapp.com",
  projectId: "login-da14b",
  storageBucket: "login-da14b.appspot.com",
  messagingSenderId: "1035688869472",
  appId: "1:1035688869472:web:629903de34ae1849fdcd05"
};

// Initialize Firebase
if(!firebase.apps.length)
{
firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
