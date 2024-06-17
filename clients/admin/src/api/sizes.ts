import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISize } from '../interfaces/role'

const sizeApi = createApi({
  reducerPath: 'size',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    // actions
    // GET
    getSizes: builder.query<any, void>({
      query: () => `/size`
    }),
    getSizeById: builder.query<ISize, number | string>({
      query: (id) => `/size/${id}`
    }),
    addSize: builder.mutation<ISize, ISize>({
      query: (size) => ({
        url: `/size`,
        method: 'POST',
        body: size
      })
    }),
    updateSize: builder.mutation<ISize, ISize>({
      query: (size) => ({
        url: `/size/${size._id}`,
        method: 'PUT',
        body: { name: size.name, quantity: size.quantity }
      })
    }),
    removeSize: builder.mutation<ISize, string>({
      query: (id) => ({
        url: `/size/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetSizesQuery,
  useGetSizeByIdQuery,
  useAddSizeMutation,
  useUpdateSizeMutation,
  useRemoveSizeMutation
} = sizeApi

export const sizeReducer = sizeApi.reducer

export default sizeApi
