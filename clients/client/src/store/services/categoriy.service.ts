import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ICategoryResponse } from '@/types'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ['categorys'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => `/categorys`,
      providesTags: ['categorys']
    })
  })
})

const categoryApiReducer = categoryApi.reducer

export const { useGetCategoriesQuery } = categoryApi
export default categoryApiReducer
