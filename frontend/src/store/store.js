import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import goalsIdReducer from '../features/goals/goalSlice'
import { apiSlice } from '../services/api'
import { setupListeners } from '@reduxjs/toolkit/query'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals:goalsIdReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
setupListeners(store.dispatch)