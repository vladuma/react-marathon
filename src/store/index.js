import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import gameReducer from './game';
import userReducer from './user';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        game: gameReducer,
        user: userReducer,
    },
});