import { Footer, Header, HeaderBottom, SpecialCase } from './components'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export const AdminLayout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  )
}
