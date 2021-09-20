import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDulN3LR-G9esYIsIYyLmCRqL5OlbK6tQU",
  authDomain: "pokemon-game-7d203.firebaseapp.com",
  databaseURL:
    "https://pokemon-game-7d203-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-game-7d203",
  storageBucket: "pokemon-game-7d203.appspot.com",
  messagingSenderId: "233008627031",
  appId: "1:233008627031:web:f4b20294b2c42aea5f5212",
};

firebase.initializeApp(firebaseConfig);

export const fire = firebase;
export const database = firebase.database();

export default database;