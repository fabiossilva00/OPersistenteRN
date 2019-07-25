import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import combineReducers from './combineReducers'

// const persistConfig = {
//     key: 'root',
//     storage
// }

// const persistedReducer = persistReducer(persistConfig, combineReducers)
// let store = createStore(persistedReducer)

// export default () => {
//     let store = createStore(persistedReducer, applyMiddleware(thunk))
//     let persistor = persistStore(store)
//     return { store, persistor }
// }


export default createStore(combineReducers, applyMiddleware(thunk))