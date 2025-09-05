import { configureStore } from '@reduxjs/toolkit';
import { creditRequestsApi } from '../api/creditRequestsApi';
import { rootReducer } from './rootState';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creditRequestsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
