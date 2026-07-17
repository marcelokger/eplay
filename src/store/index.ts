//É necessario instalar o redux pelo comando npm install --save @reduxjs/toolkit react-redux
//Primeiro a se fazer é criar a pasta store dentro do src e o arquivo index.ts
//Depois crie a pasta reducers

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cart'
import api from '../services/api'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootReducer = ReturnType<typeof store.getState>
