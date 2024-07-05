import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Icomment } from '@/types/comment';

const commentApi = createApi({
  reducerPath: 'comments',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
  }),
  endpoints: (builder) => ({
    // GET
    getComment: builder.query<Icomment[], void>({
      query: () => `/comments`,
      providesTags: ['Comments'],
    }),
    getCommentById: builder.query<Icomment, string>({
      query: (id) => `/comments/${id}`,
    }),

    // POST
    updateComment: builder.mutation<Icomment, Partial<Icomment>>({
      query: (comments) => ({
        url: `/comments/${comments._id}/${comments.productId}/${comments.userId}`,
        method: 'PUT',
        body: comments,
      }),
      invalidatesTags: ['Comments'],
    }),

    // DELETE
    removeComment: builder.mutation<Icomment, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetCommentByIdQuery,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
} = commentApi;

export const CommentReducer = commentApi.reducer;

export default commentApi;
