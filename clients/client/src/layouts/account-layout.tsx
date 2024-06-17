import { items, rootSubmenuKeys } from '@/pages/profile/menu'

import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Header } from './components'

const AccountLayout = () => {
  const [openKeys, setOpenKeys] = useState(['sub2'])

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey ?? '') === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  return (
    <>
      <Header />
      <div className='container mx-auto p-[20px] grid grid-cols-[1fr,3fr]'>
        <div className='list-sidebar w-[250px] max-w-[250px] mr-[20px] flex-shrink-0'>
          <Menu mode='inline' openKeys={openKeys} onOpenChange={onOpenChange} items={items()} />
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default AccountLayout
