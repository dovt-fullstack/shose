import { Link } from 'react-router-dom'

import { useGetCategorysQuery } from '@/api/category'
import { useGetContactsQuery } from '@/api/contact'
import { useGetTintucQuery } from '@/api/news'
import { useGetAllOrdersInAdminQuery } from '@/api/order'
import { useGetAllProductsQuery } from '@/api/product'
import { useGetAllSalesQuery } from '@/api/sale'
import { useGetUserQuery } from '@/api/user'
import ChartDashBoard from '@/components/ChartDashBoard/ChartDashBoard'
import TitlePage from '@/components/TitlePage/TitlePage'
import { Drawer, Spin } from 'antd'

import { useGetAnalystQuery, useGetAnalyticsQuery } from '@/api/analytic'
import CardThree from '@/components/ChartDashBoard/CardThree'
import { registerInteraction } from 'bizcharts'
import { useState } from 'react'

registerInteraction('active-region1', {
  start: [{ trigger: 'plot:mousemove', action: 'active-region:show', arg: { style: { fill: 'rgba(0,0,0,0.1)' } } }],
  end: [{ trigger: 'plot:mouseleave', action: 'active-region:hide' }]
})

const HomeAdmin = () => {
  const { data: productData } = useGetAllProductsQuery()
  const { data: tintucData } = useGetTintucQuery()
  const { data: contactData } = useGetContactsQuery()
  const { data: categoryData } = useGetCategorysQuery()
  const { data: userData } = useGetUserQuery()
  const { data: userSale } = useGetAllSalesQuery()
  const { data: orderList } = useGetAllOrdersInAdminQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalProducts = productData?.products ? productData.products.length : 0

  const handleDataArr = (arr: any[], filterKey: string, keyMap: string) => {
    return arr.filter((data) => data[filterKey] === keyMap).length
  }

  const analytics = [
    {
      name: 'Sản phẩm',
      Tổng: totalProducts,
      'Đang hoạt động': productData && handleDataArr(productData.products, 'trang_thai', 'active')
    },
    {
      name: 'Khách hàng',
      Tổng: userData?.users?.length,
      'Đang hoạt động': userData && handleDataArr(userData.users, 'trang_thai', 'Active')
    },
    {
      name: 'Mã giảm giá',
      Tổng: userSale?.data.length,
      'Đang hoạt động': userSale?.data.length
    },
    {
      name: 'Danh mục sản phẩm',
      Tổng: categoryData?.data.length,
      'Đang hoạt động': categoryData && handleDataArr(categoryData.data, 'trang_thai', 'Active')
    },
    { name: 'Bài viết', Tổng: 45, 'Đang hoạt động': 45 },
    {
      name: 'Danh mục bài viết',
      Tổng: tintucData?.length,
      'Đang hoạt động': tintucData && handleDataArr(tintucData, 'trang_thai', 'active')
    }
  ]

  const { data: dataAnalytics, isLoading: loadingTotalMoneys, isError: errorAnalytics } = useGetAnalyticsQuery()
  const { data: dataAnalytics2, isLoading: loadingTotalMoneys2, isError: errorAnalytics2 } = useGetAnalystQuery()

  if (!dataAnalytics || !dataAnalytics2 || loadingTotalMoneys || loadingTotalMoneys2)
    return (
      <div className='flex justify-center items-center'>
        <Spin />
      </div>
    )
  if (errorAnalytics || errorAnalytics2) return <div>error</div>

  return (
    <div className='bg-white'>
      <TitlePage title='Thống kê' />
      <div className='grid grid-cols-3'>
        <Link to='product'>
          <div className='bg-yellow-500 rounded-lg pt-4 mb-6 block  w-[300px] h-[150px]'>
            <div className='block  px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalProducts}</div>}
              <div className='text-white font-medium text-2xl mb-6'>Sản Phẩm</div>
            </div>
          </div>
        </Link>
        <Link to='category'>
          <div className='bg-green-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{categoryData?.data.length}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Danh Mục Sản Phẩm</div>
            </div>
          </div>
        </Link>
        <Link to='tintuc'>
          <div className='bg-orange-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'> {tintucData?.length} </div>}
              <div className='text-white font-medium text-2xl mb-9'>Tin Tức</div>
            </div>
          </div>
        </Link>
      </div>
      <div className='grid grid-cols-3 mt-10'>
        <Link to='contact'>
          <div className='bg-purple-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'> {contactData?.data.length}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Danh Sách Liên Hệ</div>
            </div>
          </div>
        </Link>

        <div
          className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'
          onClick={() => setIsModalOpen(true)}
        >
          <div className='block px-6'>
            {
              <div className='text-5xl text-white font-semibold pb-[22px]'>
                {orderList?.data && orderList?.data?.data?.filter((item) => item.status === 'pending').length}
              </div>
            }
            <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Chưa Xử Lý</div>
          </div>
        </div>
      </div>

      <ChartDashBoard analytics={analytics} />

      <Drawer
        title='Thống kê đơn hàng'
        open={isModalOpen}
        placement='right'
        width={1200}
        onClose={() => setIsModalOpen(!isModalOpen)}
      >
        <CardThree data={dataAnalytics} data2={dataAnalytics2} />
      </Drawer>
    </div>
  )
}

export default HomeAdmin
