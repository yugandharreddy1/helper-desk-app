import firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnT5_Bhd6CjNID03-_uNTTzrTJILMUSWE",
  authDomain: "helper-s-desk.firebaseapp.com",
  projectId: "helper-s-desk",
  storageBucket: "helper-s-desk.appspot.com",
  messagingSenderId: "895348107928",
  appId: "1:895348107928:web:da517a26d1ad2d7c423eed",
  measurementId: "G-RNGGLHEX61",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
