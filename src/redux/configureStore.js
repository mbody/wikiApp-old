// redux/configureStore.js

import { createStore, combineReducers } from 'redux';
import favorites from './favorites';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    favorites
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
