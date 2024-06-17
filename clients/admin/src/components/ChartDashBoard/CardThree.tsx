import { Select } from 'antd'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { useState } from 'react'

import { useGetAnalystMonthQuery } from '@/api/analytic'
import { DataAnalytics, IAnalticRevenueMonth, IAnalytics } from '@/interfaces'
import CardTwo from './CardTwo'
import { arrayIcons, renderOrderStatus } from './icons'
import { FormatCurrency } from '@/utils/formatNumber'

interface CardThreeProps {
  data: IAnalytics
  data2: DataAnalytics
}

const CardThree = ({ data, data2 }: CardThreeProps) => {
  const [index, setIndex] = useState(0)
  const [index2, setIndex2] = useState(0)
  const [statusOrder, setStatusOrder] = useState('pending')

  const { data: dataAnalytics3, isError: errorAnalytics3 } = useGetAnalystMonthQuery()

  const dataAhihih = [
    {
      name: dataAnalytics3?.orders[0].analytics[0].name,
      'tuần 1': dataAnalytics3?.orders[0].analytics[0].analytics[index].totalRevenue,
      'tuần 2': dataAnalytics3?.orders[0].analytics[0].analytics[1].totalRevenue,
      'tuần 3': dataAnalytics3?.orders[0].analytics[0].analytics[2].totalRevenue,
      'tuần 4': dataAnalytics3?.orders[0].analytics[0].analytics[3].totalRevenue
    },
    {
      name: dataAnalytics3?.orders[0].analytics[1].name,
      'tuần 1': dataAnalytics3?.orders[0].analytics[1].analytics[index].totalRevenue,
      'tuần 2': dataAnalytics3?.orders[0].analytics[1].analytics[1].totalRevenue,
      'tuần 3': dataAnalytics3?.orders[0].analytics[1].analytics[2].totalRevenue,
      'tuần 4': dataAnalytics3?.orders[0].analytics[1].analytics[3].totalRevenue
    },
    {
      name: dataAnalytics3?.orders[0].analytics[2].name,
      'tuần 1': dataAnalytics3?.orders[0].analytics[2].analytics[index].totalRevenue,
      'tuần 2': dataAnalytics3?.orders[0].analytics[2].analytics[1].totalRevenue,
      'tuần 3': dataAnalytics3?.orders[0].analytics[2].analytics[2].totalRevenue,
      'tuần 4': dataAnalytics3?.orders[0].analytics[2].analytics[3].totalRevenue
    },
    {
      name: dataAnalytics3?.orders[0].analytics[3].name,
      'tuần 1': dataAnalytics3?.orders[0].analytics[3].analytics[index].totalRevenue,
      'tuần 2': dataAnalytics3?.orders[0].analytics[3].analytics[1].totalRevenue,
      'tuần 3': dataAnalytics3?.orders[0].analytics[3].analytics[2].totalRevenue,
      'tuần 4': dataAnalytics3?.orders[0].analytics[3].analytics[3].totalRevenue
    }
  ]

  const handleChange = (value: string) => {
    setIndex(Number(value))
  }

  const handleChange2 = (value: string) => {
    setIndex2(Number(value))
  }

  const dataAnalyticMonth = (dataAnalytics3?.orders[1]?.analytics[0] as any)
    ? (dataAnalytics3?.orders[1]?.analytics[0] as any)[statusOrder].map((item: IAnalticRevenueMonth) => ({
        name: `tháng ${item.month}`,
        'Doanh thu': item.totalRevenue
      }))
    : []

  const handleChangeAnalyticMonth = (value: string) => {
    setStatusOrder(value)
  }

  if (errorAnalytics3) return <div>error</div>

  return (
    <>
      <div className='grid grid-cols-4 gap-5 w-full'>
        {data &&
          data?.countOrderStatus.map((orderStatus, index) => (
            <div key={index + '454'} className='rounded-sm border border-stroke  py-6 px-7.5 shadow-default   '>
              <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2  '>
                {arrayIcons[index].icon}
              </div>

              <div className='mt-4 flex items-end justify-between'>
                <div className=''>
                  <h4 className='text-title-md font-bold text-black'>
                    {FormatCurrency(data?.moneyOrderStatus[index].value || 0)}
                  </h4>
                  <span className='text-base font-medium'>
                    {orderStatus.value} đơn {renderOrderStatus(orderStatus.name).toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}

        <CardTwo price={data2?.['doanh thu tháng này']['tổng doanh thu']} title={''} />

        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default'>
          <div className='flex justify-between items-center'>
            <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2'>
              {arrayIcons[index].icon}
            </div>
            <Select
              defaultValue='0'
              style={{ width: 120 }}
              onChange={handleChange2}
              options={[
                { value: '0', label: 'Ngày' },
                { value: '1', label: 'Tuần' },
                { value: '2', label: 'Tháng' }
              ]}
            />
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div className=''>
              <h4 className='text-title-md font-bold text-black'>{FormatCurrency(data?.moneys[index2]?.value || 0)}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full mt-6 h-full rounded-sm border     border-stroke bg-white pt-7.5 pb-5 shadow-default sm:px-7.5 p-10'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold text-black  mb-4'>Doanh thu hàng tuần trong tháng</h3>
          <Select
            defaultValue='0'
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '0', label: 'Tuần 1' },
              { value: '1', label: 'Tuần 2' },
              { value: '2', label: 'Tuần 3' },
              { value: '3', label: 'Tuần 4' }
            ]}
          />
        </div>

        <ResponsiveContainer width='100%' height='100%'>
          <BarChart width={500} height={200} data={dataAhihih}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            {index === 0 && <Bar dataKey='tuần 1' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />}
            {index === 1 && (
              <Bar dataKey='tuần 2' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            )}
            {index === 2 && (
              <Bar dataKey='tuần 3' fill='#b4ae36' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            )}
            {index === 3 && (
              <Bar dataKey='tuần 4' fill='#e333c2' activeBar={<Rectangle fill='gold' stroke='purple' />} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='w-full mt-6 h-full rounded-sm border grid grid-cols-1 border-stroke bg-white pt-7.5 pb-5 shadow-default sm:px-7.5'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold text-black  mb-4'>Doanh thu hàng tháng</h3>
          <Select
            defaultValue='pending'
            style={{ width: 220 }}
            onChange={handleChangeAnalyticMonth}
            options={[
              { value: 'pending', label: 'Chờ xác nhận' },
              { value: 'waiting', label: 'Xác nhận đơn hàng' },
              { value: 'done', label: 'Hoàn thành đơn hàng' },
              { value: 'cancel', label: 'Hủy đơn hàng' }
            ]}
          />
        </div>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={dataAnalyticMonth}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='Doanh thu' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default CardThree
