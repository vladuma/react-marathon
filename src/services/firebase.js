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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database()
  }

  async getPokemonsOnce() {
    return await this.database.ref('pokemons').once('value', (snapshot) => snapshot.val());
  }

  postPokemon(key, pokemon) {
    return this.database.ref('pokemons/' + key).set(pokemon);
  }

  addPokemon(pokemon, callback) {
    const key = this.database.ref().child('pokemons').push().key;
    
    this.postPokemon(key, pokemon).then((res) => callback && callback(res));
  }

  getPokemonsSoket(callback) {
    this.database.ref('pokemons').on('value', (snapshot) => callback && callback(snapshot.val())); // subscribe to updates
  }

  offPokemonsSoket(callback) {
    this.database.ref('pokemons').off('value', (snapshot) => callback && callback(snapshot.val())); // subscribe to updates
  }
}

export default Firebase;