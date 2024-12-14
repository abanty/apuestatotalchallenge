// Third-party Imports
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import { thunk } from 'redux-thunk'

// Slice Imports
import loginReducer from '@/redux-store/slices/login'
import pokemonReducer from '@/redux-store/slices/pokemons'
import medalReducer from '@/redux-store/slices/medals'

const loginPersistConfig = {
  key: 'login',
  storage: sessionStorage,
  whitelist: ['user', 'token']
}

const rootReducer = combineReducers({
  pokemonReducer,
  medalReducer,
  loginReducer: persistReducer(loginPersistConfig, loginReducer)
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(thunk)
})

const persistor = persistStore(store)

export { store, persistor }
