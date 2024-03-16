import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/slice'
import serviceReducer from './Service/slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    services: serviceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
