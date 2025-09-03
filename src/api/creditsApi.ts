import { BASE_URL } from '../const';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Credits } from '../types/types';

export const creditsApi = createApi({
  reducerPath: 'creditsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getCredits: build.query<Credits, void>({
      query: () => 'loans',
    }),
  }),
});

export const { useGetCreditsQuery } = creditsApi;
