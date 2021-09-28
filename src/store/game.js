import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'game',
    initialState: {
        pokemons: {},
        opponentPokemons: [],
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
        },
        setOpponentPokemons: (state, action) => ({
            ...state,
            opponentPokemons: action.payload,
        })
    },
});

export const { selectPokemon, setOpponentPokemons } = slice.actions;

export const selectPokemonsSelected = state => state.game.pokemons;
export const selectOpponentPokemons = state => state.game.opponentPokemons;

export default slice.reducer;