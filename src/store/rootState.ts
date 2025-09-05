import { combineReducers } from '@reduxjs/toolkit';
import { creditRequestsApi } from '../api/creditRequestsApi';
import { creditsSlice } from './creditsSlice/credits.slice';
import { Namespace } from '../const';

export const rootReducer = combineReducers({
  [Namespace.Credits]: creditsSlice.reducer,
  [creditRequestsApi.reducerPath]: creditRequestsApi.reducer,
});
