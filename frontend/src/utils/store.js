import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../context/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
