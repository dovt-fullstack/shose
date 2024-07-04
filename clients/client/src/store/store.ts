import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderApi from './services/order.service'
import { persistReducer, persistStore } from 'redux-persist'

import authApi from './services/auth.service'
import authReducer from './slices/auth.slice'
import cartReducer from './slices/cart.slice'
import { categoryApi } from './services/categoriy.service'
import { productApi } from '.'
import productApiReducer from './services/product.service'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import paymentApi from './services/paymentServices'
import saleApi from './services/sale'
import sizeApi from './services/sizeApi'
import categoryReducer from './slices/CategorySilie'

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApiReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
  [sizeApi.reducerPath]: sizeApi.reducer,

  category: categoryReducer,
  cart: cartReducer,
  user: authReducer
})

const middleware = [
  productApi.middleware,
  categoryApi.middleware,
  authApi.middleware,
  orderApi.middleware,
  paymentApi.middleware,
  saleApi.middleware,
  sizeApi.middleware
]

// lưu lại cart thôi
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'user','category']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware)
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
