import { IResData } from './../interfaces/index'
import { IResUser, IUser } from '@/interfaces/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const userApi = createApi({
  reducerPath: 'users',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
  }),
  endpoints: (builder) => ({
    getUser: builder.query<IResUser<IUser[]>, void>({
      query: () => `/user`,
      providesTags: ['User']
    }),
    getUserById: builder.query<
      {
        message: string
        user: IUser
      },
      string
    >({
      query: (id) => `/user/${id}`,
      providesTags: ['User']
    }),
    removeUser: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'delete'
      }),
      invalidatesTags: ['User']
    }),
    addUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/signup`,
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),

    updateUser: builder.mutation<any, any>({
      query: (user) => ({
        url: `/user/${user._id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User']
    }),

    updateUserRole: builder.mutation<any, any>({
      query: (user) => ({
        url: `/userrole/${user._id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    changePassword: builder.mutation<IResData<IUser>, IUser>({
      query: (user) => ({
        url: `/user/changePassword/${user._id}`,
        method: 'PATCH',
        body: { ...user, _id: undefined }
      }),
      invalidatesTags: ['User']
    })
  })
})

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useRemoveUserMutation,
  useUpdateUserRoleMutation,
  useChangePasswordMutation
} = userApi
export const userReducer = userApi.reducer
export default userApi
