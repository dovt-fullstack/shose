import { CartPage, HomePage, ShopPage, SigninPage, SignupPage } from '@/pages'

import { AdminLayout } from '@/layouts'
import AccountLayout from '@/layouts/account-layout'
import OrderHistory from '@/pages/OrderHistory'
import { DetailPage } from '@/pages/detail'
import Orderr from '@/pages/order/Order'
import Payment from '@/pages/payment/Payment'
import OrderDetail from '@/pages/profile/order-detail'
import Profile from '@/pages/profile/profile'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import ChangePassword from '@/pages/profile/ChangePassword'
import PaymentResult from '@/pages/order/ResultOrder'
import { ForgotPasswordPage } from '@/pages/forgotPasswordPage/ForgotPasswordPage'

const isAuthenticated = (): boolean => {
  const userString = localStorage.getItem('user_client')
  const user = userString ? JSON.parse(userString) : {}

  return user
}

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to='/' />
}

export const routers = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: 'shop',
        element: <ShopPage />
      },
      {
        path: 'product/:id',
        element: <DetailPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute element={<AdminLayout />} />,
    children: [
      {
        path: '/order',
        element: <Orderr />
      },
      {
        path: '/order-history',
        element: <OrderHistory />
      },
      {
        path: '/order-history/detail/:id',
        element: <OrderDetail />
      },

      { path: 'my-order/:id', element: <OrderDetail /> },
      {
        path: '/paymentgateway',
        element: <Payment />
      },
      {
        path: '/products/checkout/payment-result',
        element: <PaymentResult />
      }
    ]
  },
  {
    path: '/profile',
    element: <PrivateRoute element={<AccountLayout />} />,
    children: [
      { index: true, element: <Profile /> },
      { path: 'my-order', element: <OrderHistory /> },
      { path: 'change-password', element: <ChangePassword /> }
    ]
  },
  {
    path: 'signin',
    element: <SigninPage />
  },
  {
    path: 'signup',
    element: <SignupPage />
  },
  {
    path: 'forgotpasswordpage',
    element: <ForgotPasswordPage />
  }
  
])
