import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ISignUp } from './../../../../admin/src/interfaces/user'
import { IUser } from '@/types/user.type'
import { IResData } from '@/types/order.type'

const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<{ message: string; user: IUser }, { email: string; password: string }>({
      query: (credentials) => ({
        url: `/signin`,
        method: 'POST',
        body: credentials
      })
    }),
    signup: builder.mutation<IUser, ISignUp>({
      query: (credentials) => ({
        url: `/signupuser`,
        method: 'POST',
        body: credentials
      })
    }),
    changePassword: builder.mutation<IResData<IUser>, IUser>({
      query: (user) => ({
        url: `/user/changePassword/${user._id}`,
        method: 'PATCH',
        body: { ...user, _id: undefined }
      })
    }),
    updateUser: builder.mutation<any, any>({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: 'PUT',
        body: user
      })
    })
  })
})

export const { useSigninMutation, useSignupMutation, useChangePasswordMutation, useUpdateUserMutation } = authApi

export const authReducer = authApi.reducer

export default authApi
