import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true,
        }),
        updateUser: (state, action) => ({
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        }),
    },
});

export const { fetchUser, updateUser, removeUser } = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUserData = state => state.user.data;
export const selectUserLocalId = state => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');

    if (idToken) {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            }),
        };
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_KEY}`, options).then(res => res.json());

        if (response.hasOwnProperty('error')) {
            dispatch(removeUser());
            localStorage.removeItem('idToken');
        } else {
            dispatch(updateUser(response.users[0]));
        }
    } else {
        dispatch(removeUser(idToken));
    }
}
export const getUserAsync = () => async (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());
}

export default slice.reducer;