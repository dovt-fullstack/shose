import { Itintuc } from '@/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const tintucApi = createApi({
  reducerPath: 'tintuc',
  tagTypes: ['Tintuc'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    getTintuc: builder.query<Itintuc[], void>({
      query: () => `/tintuc`,
      providesTags: ['Tintuc']
    }),
    getTintucById: builder.query<Itintuc, string>({
      query: (id) => `/tintuc/${id}`,
      providesTags: ['Tintuc']
    }),
    addTintuc: builder.mutation<Itintuc, Omit<Itintuc, '_id'>>({
      query: (tintuc) => ({
        url: `/tintuc`,
        method: 'POST',
        body: tintuc
      }),
      invalidatesTags: ['Tintuc']
    }),
    updateTintuc: builder.mutation<Itintuc, Itintuc>({
      query: (tintuc) => ({
        url: `/tintuc/${tintuc._id}`,
        method: 'PUT',
        body: tintuc
      }),
      invalidatesTags: ['Tintuc']
    }),
    removeTintuc: builder.mutation<Itintuc, string>({
      query: (id) => ({
        url: `/tintuc/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Tintuc']
    })
  })
})

export const {
  useGetTintucQuery,
  useGetTintucByIdQuery,
  useAddTintucMutation,
  useUpdateTintucMutation,
  useRemoveTintucMutation
} = tintucApi

export const TintucReducer = tintucApi.reducer

export default tintucApi
