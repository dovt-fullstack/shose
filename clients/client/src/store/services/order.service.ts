import { IResData, ISOrder } from '@/types/order.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getAllOrders: builder.query<IResData<ISOrder[]>, string>({
      query: (id) => ({ url: `/orders?user_id=${id}` }),
      providesTags: ['Orders']
    }),
    getOrderById: builder.query<IResData<ISOrder>, string>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Orders']
    }),
    changeStatusOrder: builder.mutation<IResData<ISOrder>, { id: string; status: string }>({
      query: (data) => ({
        url: `/orders/${data.id}`,
        method: 'PUT',
        body: { ...data, id: undefined }
      }),
      invalidatesTags: ['Orders']
    }),
    newOrder: builder.mutation<{ data: any }, any>({
      query: (data) => ({ url: '/orders', method: 'POST', body: data }),
      invalidatesTags: ['Orders']
    }),
    updateOrder: builder.mutation<any, any>({
      query: ({ _id, status }) => ({ url: '/orders/' + _id, method: 'PUT', body: { status } }),
      invalidatesTags: ['Orders']
    }),
    getOrderById2: builder.query<any, any>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Orders']
    })
  })
})

export const {
  useGetAllOrdersQuery,
  useNewOrderMutation,
  useGetOrderByIdQuery,
  useChangeStatusOrderMutation,
  useUpdateOrderMutation
} = orderApi
export const orderReducer = orderApi.reducer
export default orderApi
