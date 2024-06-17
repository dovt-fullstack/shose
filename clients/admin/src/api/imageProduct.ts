import { ImageProduct } from '@/interfaces/product'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const imageProductApi = createApi({
  reducerPath: 'imageProduct',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    // actions
    // GET
    getImageProducts: builder.query<any, void>({
      query: () => `/imageProduct`
    }),
    getImageProductById: builder.query<ImageProduct, string>({
      query: (id) => `/imageProduct/${id}`
    }),
    addImageProduct: builder.mutation<any, void>({
      query: (imageProduct) => ({
        url: `/imageProduct`,
        method: 'POST',
        body: imageProduct
      })
    }),
    updateImageProduct: builder.mutation<ImageProduct, ImageProduct>({
      query: (imageProduct) => ({
        url: `/imageProduct/${imageProduct._id}`,
        method: 'PUT',
        body: imageProduct
      })
    }),
    removeImageProduct: builder.mutation<ImageProduct, string>({
      query: (id) => ({
        url: `/imageProduct/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetImageProductsQuery,
  useGetImageProductByIdQuery,
  useAddImageProductMutation,
  useUpdateImageProductMutation,
  useRemoveImageProductMutation
} = imageProductApi

export const imageProductReducer = imageProductApi.reducer

export default imageProductApi
