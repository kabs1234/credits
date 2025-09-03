import { configureStore } from '@reduxjs/toolkit';
import { creditsApi } from '../api/creditsApi';
import { rootReducer } from './rootState';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
