import { IResData } from '@/interfaces'
import { ISOrder } from '@/interfaces/order'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080'
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getAllOrdersInAdmin: builder.query<IResData<{ data: ISOrder[] }>, void>({
      query: () => `/api/GetAllOrder`,
      providesTags: ['Orders']
    }),
    getAllOrders: builder.query<IResData<ISOrder[]>, any>({
      query: (params) => ({ url: '/api/orders', params }),
      providesTags: ['Orders']
    }),
    getOrderById: builder.query<IResData<ISOrder>, string>({
      query: (id) => `/api/orders/${id}`,
      providesTags: ['Orders']
    }),
    changeStatusOrder: builder.mutation<IResData<ISOrder>, { id: string; status: string }>({
      query: (data) => ({
        url: `/api/orders/${data.id}`,
        method: 'PUT',
        body: { ...data, id: undefined }
      }),
      invalidatesTags: ['Orders']
    })
  })
})

export const { useGetAllOrdersInAdminQuery, useGetAllOrdersQuery, useGetOrderByIdQuery, useChangeStatusOrderMutation } =
  orderApi
export const orderReducer = orderApi.reducer
export default orderApi
