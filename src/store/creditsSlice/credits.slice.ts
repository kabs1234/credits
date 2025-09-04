import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Namespace } from '../../const';
import { creditsApi } from '../../api/creditsApi';
import type { Credit, Credits } from '../../types/types';

type CreditsSlice = {
  credits: Credits;
  isLoading: boolean;
};

const initialState: CreditsSlice = {
  credits: [],
  isLoading: true,
};

export const creditsSlice = createSlice({
  name: Namespace.Credits,
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>): void {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      creditsApi.endpoints.getCredits.matchFulfilled,
      (state, action: PayloadAction<Credits>) => {
        state.credits = action.payload;
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      creditsApi.endpoints.createCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        state.credits = [...state.credits, action.payload];
      }
    );
    builder.addMatcher(
      creditsApi.endpoints.reconsiderCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        const editedCredit = action.payload;
        const CreditToReplace = state.credits.find((credit) => {
          return credit.id === editedCredit.id;
        });
        const creditToReplaceIndex = state.credits.findIndex((credit) => {
          return credit.id === (CreditToReplace as Credit).id;
        });

        state.credits = [
          ...state.credits.slice(0, creditToReplaceIndex),
          editedCredit,
          ...state.credits.slice(creditToReplaceIndex + 1),
        ];
      }
    );
  },
});

export const { setIsLoading } = creditsSlice.actions;
