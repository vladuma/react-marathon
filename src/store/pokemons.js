import { createSlice } from '@reduxjs/toolkit';
import { selectUserLocalId } from './user';
import Firebase from '../services/firebase';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        loading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            loading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            loading: false,
            data: action.payload,
            error: null,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            loading: false,
            data : {},
            error: action.payload,
        }),
    },
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.loading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectUserLocalId(getState());
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-7d203-default-rtdb.europe-west1.firebasedatabase.app/${localId}/pokemons.json`).then(res => res.json());
    dispatch(fetchPokemonsResolve(data || {}));
}
export const addPokemonAsync = (pokemon) => async (dispatch) => {
    dispatch(fetchPokemons());
    await Firebase.addPokemon(pokemon); 
    const data = await Firebase.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data.val()))
}

export default slice.reducer;