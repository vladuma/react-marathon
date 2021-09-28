import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'game',
    initialState: {
        pokemons: {},
        opponentPokemons: [],
        selectedOpponentPokemon: null,
        wonGame: false,
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
        }),
        setSelectedOpponentPokemons: (state, action) => ({
            ...state,
            selectedOpponentPokemon: state.opponentPokemons.find((item) => item.id === action.payload.id),
        }),
        setWonGame: (state) => ({
            ...state,
            wonGame: true,
        }),
    },
});

export const { selectPokemon, setOpponentPokemons, setSelectedOpponentPokemons, setWonGame } = slice.actions;

export const selectPokemonsSelected = state => state.game.pokemons;
export const selectOpponentPokemons = state => state.game.opponentPokemons;
export const selectOpponentPokemonsSelected = state => state.game.selectedOpponentPokemon;
export const selectGameResult = state => state.game.wonGame;

export default slice.reducer;