import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Icomment } from '../interfaces/comment'
const commentApi = createApi({
  reducerPath: 'comments',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  endpoints: (builder) => ({
    // actions
    // GET
    getComment: builder.query<Icomment[], void>({
      query: () => `/comments`,
      providesTags: ['Comments']
    }),
    getCommentById: builder.query<Icomment, string>({
      query: (id) => `/comments/${id}`
    }),

    updateComment: builder.mutation<Icomment, Icomment>({
      query: (comments) => ({
        url: `/comments/${comments._id}/${comments.productId}/${comments.userId}`,
        method: 'PUT',
        body: comments
      }),
      invalidatesTags: ['Comments']
    }),
    removeComment: builder.mutation<Icomment, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Comments']
    })
  })
})

export const { useGetCommentQuery, useGetCommentByIdQuery, useUpdateCommentMutation, useRemoveCommentMutation } =
  commentApi

export const CommentReducer = commentApi.reducer

export default commentApi
