import { pathRouter } from '@/constants/pathRouter'

import {
  BarChartOutlined,
  CommentOutlined,
  DesktopOutlined,
  MailOutlined,
  ShoppingOutlined,
  UserOutlined
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import { AiOutlineControl, AiOutlineFontSize } from 'react-icons/ai'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { FaClipboardList, FaRecycle, FaRegNewspaper, FaUserEdit, FaUserFriends, FaWarehouse } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { IoTicket } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem
}

export const Menuitems: MenuItem[] = [
  getItem(<Link to={pathRouter.home}> Thống kê </Link>, 'Dashboard', <BarChartOutlined />),

  // quản lý đơn hàng
  getItem(
    <NavLink to={`/${pathRouter.admin}/${pathRouter.manageOrder}`}> Đơn hàng </NavLink>,
    'orders',
    <FaClipboardList />
  ),

  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(
      <Link to={`/${pathRouter.admin}/${pathRouter.productList}`}> Sản phẩm </Link>,
      'products',
      <ShoppingOutlined />
    ),
    // quản lý người dùng

    getItem(
      <Link to={`/${pathRouter.admin}/${pathRouter.userList}`}> Người dùng </Link>,
      'customers',
      <FaUserFriends />
    ),

    getItem(
      <Link to={`/${pathRouter.admin}/${pathRouter.categoryList}`}> Danh mục </Link>,
      'categories',
      <BiSolidCategoryAlt />
    ),
    getItem(<Link to={`/${pathRouter.admin}/${pathRouter.warehose}`}> Kho hàng</Link>, 'warehose', <FaWarehouse />),

    getItem(<Link to={`/${pathRouter.admin}/${pathRouter.roleList}`}> Role </Link>, 'sizes', <AiOutlineFontSize />),
    getItem(
      <NavLink to={`/${pathRouter.admin}/${pathRouter.voucher}`}> Mã giảm giá </NavLink>,
      'vouchers',
      <IoTicket />
    ),
    // getItem(
    //   <NavLink to={`/${pathRouter.admin}/${pathRouter.news}`}> Danh mục tin tức </NavLink>,
    //   'category-news',
    //   <BiCategoryAlt />
    // ),
    getItem(<NavLink to={`/${pathRouter.admin}/${pathRouter.news}`}> Tin tức </NavLink>, 'news', <DesktopOutlined />),
    getItem(
      <NavLink to={`/${pathRouter.admin}/${pathRouter.comments}`}> Bình luận </NavLink>,
      'comments',
      <CommentOutlined />
    ),
    getItem(
      <NavLink to={`/${pathRouter.admin}/${pathRouter.contact}`}> Liên hệ </NavLink>,
      'contact',
      <MailOutlined />
    ),
    getItem(
      <NavLink to={`/${pathRouter.admin}/${pathRouter.information}`}> Thông tin </NavLink>,
      'information',
      <FaRegNewspaper />
    ),
    getItem(<NavLink to={`/${pathRouter.admin}/${pathRouter.recycle}`}> Thùng rác </NavLink>, 'recycle', <FaRecycle />)
  ])
]
