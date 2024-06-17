import { ISale } from '@/interfaces/sale'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const saleApi = createApi({
  reducerPath: 'saleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080'
  }),
  tagTypes: ['Sales'],
  endpoints: (builder) => ({
    getAllSales: builder.query<{ data: ISale[] }, void>({
      query: () => ({ url: '/api/sales' }),
      providesTags: ['Sales']
    }),
    getSaleById: builder.query<{ data: ISale }, string>({
      query: (id) => ({
        url: '/api/sales/' + id
      }),
      keepUnusedDataFor: 0
    }),
    getSaleByCode: builder.query<{ data: ISale }, string>({
      query: (code) => ({
        url: '/api/sales/get-by-code' + code
      }),
      keepUnusedDataFor: 0
    }),
    newSale: builder.mutation<{ data: ISale; message: string }, ISale>({
      query: (data) => ({
        url: '/api/sales',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Sales']
    }),
    updateSale: builder.mutation<{ data: ISale; message: string }, ISale>({
      query: (data) => {
        const { _id, ...obj } = data
        return {
          url: '/api/sales/' + _id,
          method: 'PUT',
          body: obj
        }
      },
      invalidatesTags: ['Sales']
    }),
    decreaseSale: builder.mutation<{ data: ISale; message: string }, string>({
      query: (id) => {
        return {
          url: '/api/sales/decrease-sale/' + id,
          method: 'PATCH'
        }
      },
      invalidatesTags: ['Sales']
    }),
    removeSale: builder.mutation<{ data: ISale; message: string }, string>({
      query: (id) => ({
        url: '/api/sales/' + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['Sales']
    })
  })
})

export const {
  useGetAllSalesQuery,
  useGetSaleByIdQuery,
  useGetSaleByCodeQuery,
  useDecreaseSaleMutation,
  useNewSaleMutation,
  useUpdateSaleMutation,
  useRemoveSaleMutation
} = saleApi
export default saleApi
