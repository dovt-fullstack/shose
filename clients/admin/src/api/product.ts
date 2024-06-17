import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct, IResDataProducts, IResProduct } from '../interfaces/product'

const productApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IResDataProducts, void>({
      query: () => `/products`,

      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.products.map(({ _id }) => ({ type: 'Products' as const, _id })),
            { type: 'Products' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Products', id: 'LIST' }]
      }
    }),
    getProductById: builder.query<IResProduct, string>({
      query: (id) => `/products/${id}`,
      providesTags: ['Products']
    }),

    addProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products`,
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    updateProduct: builder.mutation<IProduct, IProduct>({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: ['Products']
    }),
    removeProduct: builder.mutation<IProduct, number | string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      })
    }),
    //
    getDeletedProducts: builder.query<any, void>({
      query: () => '/products-daleted'
    }),

    // RESTORE a product
    restoreProduct: builder.mutation<IProduct, number | string>({
      query: (id) => ({
        url: `/products/restore/${id}`,
        method: 'PATCH'
      })
    }),
    // DESTROY a product
    PermanentDeleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/hard-delete/${id}`,
        method: 'DELETE'
      })
    }),
    searchProducts: builder.query<IProduct[], string>({
      query: (name) => `/products/search/${name}`
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useGetDeletedProductsQuery,
  useSearchProductsQuery,
  usePermanentDeleteProductMutation,
  useRestoreProductMutation
} = productApi

export const productReducer = productApi.reducer

export default productApi
