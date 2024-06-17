import { Navigate, createBrowserRouter } from 'react-router-dom'

import AdminLayout from './Layout/AdminLayout'

import { pathRouter } from './constants/pathRouter'
import CategoryAdd from './pages/Category/Add_Edit'
import CategoryEdit from './pages/Category/Edit'
import AdminCategory from './pages/Category/List'
import Contact from './pages/Contact/Contact'
import Infomation from './pages/Infomation/Infomation'
import ListOrder from './pages/ManageOrder/ListOrder'
import ListNews from './pages/News/ListNews'
import NotFound from './pages/NotFound/NotFound'

import HomeAdmin from './Layout/HomeAdmin'
import Comment from './pages/Comment/Comment'
import ContactAdd from './pages/Contact/AddContact'
import ContactEdit from './pages/Contact/EditContact'
import Detail from './pages/ManageOrder/OrderDetail'
import AddNew from './pages/News/AddNew'
import Detailtintuc from './pages/News/Detail'
import SuaTinTuc from './pages/News/Edit'
import Product from './pages/Product/Product'
import ProductDetail from './pages/Product/ProductDetail'
import RecycleBin from './pages/Product/RecycleBin'
import UpdateProduct from './pages/Product/UpdateProduct'
import AddRole from './pages/RolePage/AddRole'
import RoleList from './pages/RolePage/RoleList'
import UpdateRole from './pages/RolePage/UpdateRole'
import ListVoucher from './pages/Sale/ListVoucher'
import SignIn from './pages/SignIn/SignIn'
import Signup from './pages/SignUp/Signup'
import AdminUserAdd from './pages/User/Add'
import AdminEditUser from './pages/User/Edit'
import AdminUser from './pages/User/User'
import WareHose from './pages/Warehose/WareHose'

const isAuthenticated = (): boolean => {
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : {}
  const allowedRoles = ['admin', 'nhân viên', 'quản lý'] // Danh sách các vai trò được phép truy cập
  return user && allowedRoles.includes(user?.role?.role_name)
}

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to='/' />
}

export const routers = createBrowserRouter([
  {
    path: pathRouter.signin,
    element: <SignIn />
  },
  {
    path: pathRouter.signup,
    element: <Signup />
  },

  {
    path: pathRouter.admin,
    element: <PrivateRoute element={<AdminLayout />} />,
    children: [
      {
        path: pathRouter.manageOrder,
        element: <ListOrder />
      },
      {
        path: pathRouter.manageOrderDetail,
        element: <Detail />
      },
      {
        path: pathRouter.voucher,
        element: <ListVoucher />
      },
      {
        path: pathRouter.newEdit,
        element: <SuaTinTuc />
      },
      {
        path: pathRouter.news,
        element: <ListNews />
      },
      {
        path: pathRouter.newDetail,
        element: <Detailtintuc />
      },
      {
        path: pathRouter.newAdd,
        element: <AddNew />
      },
      {
        path: pathRouter.comments,
        element: <Comment />
      },
      {
        path: pathRouter.contact,
        element: <Contact />
      },
      {
        path: pathRouter.information,
        element: <Infomation />
      },
      {
        path: pathRouter.productList,
        element: <Product />
      },
      {
        path: pathRouter.recycle,
        element: <RecycleBin />
      },
      {
        path: pathRouter.contactAdd,
        element: <ContactAdd />
      },
      {
        path: pathRouter.contactEdit,
        element: <ContactEdit />
      },
      {
        path: pathRouter.productDetail,
        element: <ProductDetail />
      },

      {
        path: pathRouter.productEdit,
        element: <UpdateProduct />
      },
      {
        path: pathRouter.recycle,
        element: <RecycleBin />
      },
      {
        path: pathRouter.roleList,
        element: <RoleList />
      },
      {
        path: pathRouter.roleAdd,
        element: <AddRole />
      },
      {
        path: pathRouter.roleUpdate,
        element: <UpdateRole />
      },

      {
        path: '',
        element: <HomeAdmin />
      },

      {
        path: pathRouter.categoryList,
        element: <AdminCategory />
      },
      {
        path: pathRouter.categoryAdd,
        element: <CategoryAdd />
      },
      {
        path: pathRouter.categoryEdit,
        element: <CategoryEdit />
      },

      {
        path: pathRouter.userList,
        element: <AdminUser />
      },
      {
        path: pathRouter.userAdd,
        element: <AdminUserAdd />
      },
      {
        path: pathRouter.userEdit,
        element: <AdminEditUser />
      },
      {
        path: pathRouter.warehose,
        element: <WareHose />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
