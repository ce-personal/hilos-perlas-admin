// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_BRjjOhs8UDpCDTUpPXhlhh5P7SGumls",
  authDomain: "nothing-01-01-01.firebaseapp.com",
  projectId: "nothing-01-01-01",
  storageBucket: "nothing-01-01-01.appspot.com",
  messagingSenderId: "325023130727",
  appId: "1:325023130727:web:b18cbff2fd6d3e03a220c2",
  measurementId: "G-00YN1226KQ"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  const analytics = getAnalytics(appFireBase);

  
}
export default {
  appFireBase
}