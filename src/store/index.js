import { configureStore } from '@reduxjs/toolkit';
import pokemonsReducer from './pokemons';
import gameReducer from './game';

export default configureStore({
    reducer: {
        pokemons: pokemonsReducer,
        game: gameReducer,
    },
});