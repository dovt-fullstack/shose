import { AiOutlineUser } from 'react-icons/ai'

import { message, type MenuProps } from 'antd'
import { GrLogout } from 'react-icons/gr'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

export const items = (): MenuItem[] => {
  return [
    // getItem(<Link to='/'>Trang chủ</Link>, 'sub1', <AiFillHome className='text-[14px] mr-2 ' />),
    getItem('Thông tin tài khoản', 'sub2', <AiOutlineUser className='text-[14px] mr-2 ' />, [
      getItem(<Link to='/profile'>Hồ sơ</Link>, '1'),
      // getItem(<Link to='/profile/my-address'>Địa chỉ</Link>, '2'),
      getItem(<Link to={'/profile/change-password'}>Đổi mật khẩu</Link>, '3')
    ]),
    getItem(<Link to='my-order'>Đơn hàng của tôi</Link>, 'sub3', <MdShoppingCart className='text-[14px] mr-2 ' />),
    getItem(
      <p
        onClick={() => {
          localStorage.removeItem('user')
          localStorage.clear()
          sessionStorage.clear()
          message.success('Đã đăng xuất thành công')
          toast.success('Đã đăng xuất thành công')
          window.location.href = '/signin'
        }}
        className='cursor-pointer'
      >
        Đăng xuất
      </p>,
      'sub5',
      <GrLogout className='text-[14px] mr-2 ' />
    )
  ]
}

// export const items: MenuItem[] = [
//   getItem(<Link to='/'>Trang chủ</Link>, 'sub1', <AiFillHome className='text-[14px] mr-2 ' />),
//   getItem('Thông tin tài khoản', 'sub2', <AiOutlineUser className='text-[14px] mr-2 ' />, [
//     getItem('Hồ sơ', '1'),
//     getItem('Địa chỉ', '2'),
//     getItem('Đổi mật khẩu', '3')
//   ]),
//   getItem(<Link to='my-order'>Đơn hàng của tôi</Link>, 'sub2', <MdShoppingCart className='text-[14px] mr-2 ' />),
//   getItem(<Link to='my-voucher'>Mã khuyến mại</Link>, 'sub3', <AiFillCreditCard className='text-[14px] mr-2 ' />),
//   getItem(<p className='cursor-pointer'>Đăng xuất</p>, 'sub4', <GrLogout className='text-[14px] mr-2 ' />)
// ]

// submenu keys of first level
export const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5']
