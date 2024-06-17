import { LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { TbPassword } from 'react-icons/tb'

import ChangePassword from '@/components/ModalChangePass/ModalChangePass'
import ModalInfoUser from '@/components/ModalInfoUser/ModalInfoUser'
import { IUser } from '@/interfaces/user'
import { Dropdown, message } from 'antd'
import { MenuProps } from 'antd/es/menu'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const [user, setUser] = useState<IUser>()
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const [showMenu, setShowMenu] = useState(false)

  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.clear()
    sessionStorage.clear()
    message.success('Đã đăng xuất thành công')
    navigate('/')
  }

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setShowMenu(true)
    } else if (e.key === '3') {
      handleLogout()
    } else if (e.key === '2') {
      setShowChangePassword(true)
    }
  }

  const items: MenuProps['items'] = [
    {
      label: 'Hồ sơ',
      key: '1',
      icon: <ProfileOutlined />
    },
    {
      label: 'Đổi mật khẩu',
      key: '2',
      icon: <TbPassword />
    },
    {
      label: 'Đăng xuất',
      key: '3',
      icon: <LogoutOutlined />
    }
  ]
  return (
    <>
      <header className='bg-gray-50'>
        <div className='mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8'>
          <div className='flex items-center sm:justify-between sm:gap-4'>
            <div className='flex flex-1 items-center justify-between gap-8 sm:justify-end'>
              <Link
                to=''
                className='block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700'
              >
                <span className='sr-only'>Notifications</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </Link>

              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick
                }}
              >
                <button type='button' className='group flex shrink-0 items-center rounded-lg transition'>
                  <span className='sr-only'>Menu</span>
                  <img
                    alt='Man'
                    src='https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    className='h-10 w-10 rounded-full object-cover'
                  />

                  <p className='ms-2 hidden text-left text-xs sm:block'>
                    <strong className='block font-medium'>{user?.name}</strong>

                    <span className='text-gray-500'> {user?.email} </span>
                  </p>
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
      {showMenu && <ModalInfoUser handleHideUserProfile={() => setShowMenu(false)} />}
      {showChangePassword && <ChangePassword handleHideChangePassword={() => setShowChangePassword(false)} />}
    </>
  )
}
