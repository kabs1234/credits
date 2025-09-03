import { combineReducers } from '@reduxjs/toolkit';
import { creditsApi } from '../api/creditsApi';
import { creditsSlice } from './creditsSlice/credits.slice';
import { Namespace } from '../const';

export const rootReducer = combineReducers({
  [Namespace.Credits]: creditsSlice.reducer,
  [creditsApi.reducerPath]: creditsApi.reducer,
});
