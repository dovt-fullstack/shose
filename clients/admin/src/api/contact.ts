import { IContact, IResData } from '@/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const contactApi = createApi({
  reducerPath: 'contact',
  tagTypes: ['Contact'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
    // baseUrl: 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    getContacts: builder.query<IResData<IContact[]>, void>({
      query: () => `/contact`,
      providesTags: ['Contact']
    }),
    getContactById: builder.query<IResData<IContact>, string>({
      query: (id) => `/contact/${id}`,
      providesTags: ['Contact']
    }),
    removeContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Contact']
    }),
    addContact: builder.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contact`,
        method: 'POST',
        body: contact
      }),
      invalidatesTags: ['Contact']
    }),
    updateContact: builder.mutation<IContact, IContact>({
      query: (contact) => ({
        url: `/contact/${contact._id}`,
        method: 'PATCH',
        body: contact
      }),
      invalidatesTags: ['Contact']
    })
  })
})

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useRemoveContactMutation,
  useAddContactMutation,
  useUpdateContactMutation
} = contactApi
export const contactReducer = contactApi.reducer
export default contactApi
