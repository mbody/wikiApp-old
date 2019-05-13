// redux/configureStore.js

import {createStore, combineReducers, applyMiddleware} from 'redux';
import wikipedia from './wikipedia';
import favorites from './favorites';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    favorites,
    wikipedia
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['wikipedia'] // wikipedia will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
