import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{},
    loggedin:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoggedIn:(state, action)=>{
            state.loggedin = true;
        },
        updateUser:(state,action)=>{
            const outputObject = {};
            Object.keys(state.user)
                .forEach(obj => outputObject[obj] =
                    (action.payload.hasOwnProperty(obj) ? action.payload[obj] : state.user[obj]))
            state.user = outputObject;
        },
        logoutUser:(state, action)=>{
            state.user = null;
                state.loggedin= false;
        }
    },
});

export const { setUser,setLoggedIn,updateUser ,logoutUser} = userSlice.actions;

export default userSlice.reducer;
