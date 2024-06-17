import { analyticApi } from '@/api/analytic'
import authApi from '@/api/auth'
import categoryApi from '@/api/category'
import commentApi from '@/api/comments'
import contactApi from '@/api/contact'
import imageProductApi from '@/api/imageProduct'
import informationApi from '@/api/informations'
import tintucApi from '@/api/news'
import orderApi from '@/api/order'
import productApi from '@/api/product'
import roleApi from '@/api/role'
import saleApi from '@/api/sale'
import sizeApi from '@/api/sizes'
import userApi from '@/api/user'
import warehouseApi from '@/api/warehouse'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['users']
}

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [tintucApi.reducerPath]: tintucApi.reducer,
  [imageProductApi.reducerPath]: imageProductApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
  [sizeApi.reducerPath]: sizeApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [warehouseApi.reducerPath]: warehouseApi.reducer,
  [informationApi.reducerPath]: informationApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [analyticApi.reducerPath]: analyticApi.reducer
})

const middleware = [
  authApi.middleware,
  userApi.middleware,
  productApi.middleware,
  categoryApi.middleware,
  tintucApi.middleware,
  saleApi.middleware,
  commentApi.middleware,
  imageProductApi.middleware,
  sizeApi.middleware,
  roleApi.middleware,
  warehouseApi.middleware,
  informationApi.middleware,
  contactApi.middleware,
  orderApi.middleware,
  analyticApi.middleware,
]

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
