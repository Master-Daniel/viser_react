import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import globalSlice from './slices/global';  // Import your slice

const storage = createWebStorage("local");

const persistConfig = {
    key: 'viser-bank',
    version: 1,
    storage: storage,
};

const rootReducer = combineReducers({
    global: globalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);