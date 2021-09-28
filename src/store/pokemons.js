import { createSlice } from '@reduxjs/toolkit';
import Firebase from '../services/firebase';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        loading: false,
        date: {},
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

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons());
    const data = await Firebase.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data.val()))
}

export default slice.reducer;