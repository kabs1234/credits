import { BASE_URL } from '../const';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Credit,
  Credits,
  RequestCredit,
  TableCredit,
} from '../types/types';
import { IsCreditStatusApproved } from '../utils/utils';

export const creditsApi = createApi({
  reducerPath: 'creditsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCredits: build.query<Credits, void>({
      query: () => 'loans',
    }),
    createCredit: build.mutation<Credit, RequestCredit>({
      query: (credit) => {
        return {
          url: 'loans',
          method: 'POST',
          body: credit,
        };
      },
    }),
    reconsiderCredit: build.mutation<Credit, TableCredit>({
      query: (credit) => {
        return {
          url: `loans/${credit.id}`,
          method: 'PUT',
          body: {
            ...credit,
            status: 'in_review',
          },
        };
      },
    }),
    viewCreditRequest: build.mutation<Credit, TableCredit>({
      query: (credit) => {
        return {
          url: `loans/${credit.id}`,
          method: 'PUT',
          body: {
            ...credit,
            status: IsCreditStatusApproved(),
          },
        };
      },
    }),
  }),
});

export const {
  useGetCreditsQuery,
  useCreateCreditMutation,
  useReconsiderCreditMutation,
  useViewCreditRequestMutation,
} = creditsApi;
