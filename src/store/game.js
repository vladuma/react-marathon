import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'game',
    initialState: {
        pokemons: {},
    },
    reducers: {
        selectPokemon: (state, action) => {
            if (state.pokemons[action.payload.key]) {
                const pokemonsCopy = {...state.pokemons};

                delete pokemonsCopy[action.payload.key];
                return {
                    ...state,
                    pokemons: {
                        ...pokemonsCopy
                    },
                };
            }
            return {
                ...state,
                pokemons: {
                    ...state.pokemons,
                    [action.payload.key]: action.payload.pokemon,
                },
            }
        }
    },
});

export const { selectPokemon } = slice.actions;

export const selectPokemonsSelected = state => state.game.pokemons;

export default slice.reducer;