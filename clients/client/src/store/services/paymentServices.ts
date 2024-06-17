import { IPayment } from '@/types/payment'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import axios from 'axios'

const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080'
  }),
  tagTypes: ['Sales'],
  endpoints: (builder) => ({
    getAllPayment: builder.query<{ data: IPayment[] }, void>({
      query: () => ({ url: '/api/payments' })
    }),
    newPayment: builder.mutation<{ data: IPayment }, IPayment>({
      query: (data) => ({ url: '/api/payments', method: 'POST', body: data })
    }),
    paymentByVNpay: builder.mutation<
      void,
      {
        user: string
        items: any[]
        total: number
        priceShipping: string
        noteOrder?: string
        moneyPromotion: {
          price: number
        }
        paymentMethodId: string
        inforOrderShipping: {
          name: string
          email: string
          phone: string
          address: string
          noteShipping?: string
        }
      }
    >({
      query: (data) => ({ url: '/create-checkout-vnpay', method: 'POST', body: data })
    })
  })
})

export const { useGetAllPaymentQuery, useNewPaymentMutation, usePaymentByVNpayMutation } = paymentApi
export default paymentApi

export const createPaymentUrl = (data: any) => {
  return axios({
    url: 'https://maket-tmdt-d58d5f285237.herokuapp.com/api/recharge-momo',
    method: 'POST',
    data
  })
}
