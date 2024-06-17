import { IWareHose } from '@/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const warehouseApi = createApi({
  reducerPath: 'warehose',
  tagTypes: ['Warehouse'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    getallWareHouses: builder.query<IWareHose[], void>({
      query: () => `/warehose`,
      providesTags: ['Warehouse']
    }),
    getWareHouseById: builder.query<IWareHose, string>({
      query: (id) => `/warehose/${id}`,
      providesTags: ['Warehouse']
    }),

    addWarehouse: builder.mutation<IWareHose, IWareHose>({
      query: (warehouse) => ({
        url: `/warehose`,
        method: 'POST',
        body: warehouse
      }),
      invalidatesTags: ['Warehouse']
    }),

    updateWarehouse: builder.mutation<IWareHose, IWareHose>({
      query: (warehouse) => ({
        url: `/warehose/${warehouse._id}`,
        method: 'PUT',
        body: warehouse
      }),
      invalidatesTags: ['Warehouse']
    }),
    isActiveWarehouse: builder.mutation<IWareHose, IWareHose>({
      query: (warehouse) => ({
        url: `/status-update/warehose/${warehouse._id}`,
        method: 'PUT',
        body: warehouse
      }),
      invalidatesTags: ['Warehouse']
    }),
    deleteWareHouse: builder.mutation({
      query: (id: string) => ({
        url: `/warehose/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Warehouse']
    })
  })
})

export const {
  useGetWareHouseByIdQuery,
  useGetallWareHousesQuery,
  useAddWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWareHouseMutation
} = warehouseApi

export const warehouseReducer = warehouseApi.reducer

export default warehouseApi
