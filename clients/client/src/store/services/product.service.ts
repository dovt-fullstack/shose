import { IProduct, IProductResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<IProductResponse, void>({
      query: () => `/products`,
      providesTags: ['Product']
    }),
    getProductById: builder.query<{ message: string; product: IProduct }, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Product']
    })
  })
})
const productApiReducer = productApi.reducer

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi
export default productApiReducer
