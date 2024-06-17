import { IResData } from '@/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../interfaces/category'

const categoryApi = createApi({
  reducerPath: 'category',
  tagTypes: ['Category'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    getCategorys: builder.query<IResData<ICategory[]>, void>({
      query: () => `/categorys`,
      providesTags: ['Category']
    }),
    getCategoryById: builder.query<IResData<ICategory>, string>({
      query: (id) => `/categorys/${id}`,
      providesTags: ['Category']
    }),
    removeCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categorys/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    }),
    addCategory: builder.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categorys`,
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['Category']
    }),
    updateCategory: builder.mutation<ICategory, ICategory>({
      query: (category) => ({
        url: `/categorys/${category._id}`,
        method: 'PATCH',
        body: category
      }),
      invalidatesTags: ['Category']
    })
  })
})

export const {
  useGetCategorysQuery,
  useGetCategoryByIdQuery,
  useRemoveCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation
} = categoryApi
export const categoryReducer = categoryApi.reducer
export default categoryApi
