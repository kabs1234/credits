import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Namespace } from '../../const';
import type { Credit, Credits } from '../../types/types';
import { creditRequestsApi } from '../../api/creditRequestsApi';

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
      creditRequestsApi.endpoints.getCredits.matchFulfilled,
      (state, action: PayloadAction<Credits>) => {
        state.credits = action.payload;
        state.isLoading = false;
      }
    );
    builder.addMatcher(
      creditRequestsApi.endpoints.createCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        state.credits = [...state.credits, action.payload];
      }
    );
    builder.addMatcher(
      creditRequestsApi.endpoints.reconsiderCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        const editedCredit = action.payload;
        const credits = state.credits;
        const creditToReplaceIndex = credits.findIndex((credit) => {
          return credit.id === editedCredit.id;
        });

        state.credits = [
          ...credits.slice(0, creditToReplaceIndex),
          editedCredit,
          ...credits.slice(creditToReplaceIndex + 1),
        ];
      }
    );
    builder.addMatcher(
      creditRequestsApi.endpoints.viewCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        const editedCredit = action.payload;
        const credits = state.credits;
        const creditToReplaceIndex = credits.findIndex((credit) => {
          return credit.id === editedCredit.id;
        });

        state.credits = [
          ...credits.slice(0, creditToReplaceIndex),
          editedCredit,
          ...credits.slice(creditToReplaceIndex + 1),
        ];
      }
    );
    builder.addMatcher(
      creditRequestsApi.endpoints.deleteCredit.matchFulfilled,
      (state, action: PayloadAction<Credit>) => {
        const credits = state.credits;
        const deletedCard = action.payload;
        const deletedCardIndex = credits.findIndex((credits) => {
          return credits.id === deletedCard.id;
        });

        state.credits = [
          ...credits.slice(0, deletedCardIndex),
          ...credits.slice(deletedCardIndex + 1),
        ];
      }
    );
  },
});

export const { setIsLoading } = creditsSlice.actions;
