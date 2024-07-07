import { CheckOutlined, CloseCircleFilled, EyeFilled } from '@ant-design/icons'
import './order.css'
import type { RangePickerProps } from 'antd/es/date-picker'

import { useChangeStatusOrderMutation, useGetAllOrdersInAdminQuery } from '@/api/order'
import TitlePage from '@/components/TitlePage/TitlePage'
import useDebounce from '@/hooks'
import { IProduct } from '@/interfaces/product'
import { Button, DatePicker, Input, Space, Table, notification } from 'antd'
import { useEffect, useState } from 'react'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { toast } from 'react-toastify'

interface IOrderTable {
  code: string
  name: string
  status: string
  address: string
  product: {
    product: IProduct
    quantity: number
    color: string
    size: string
  }[]
  moneny: number
}
export default function ListOrder() {

  //lấy dữ liệu các đơn hàng 
  const { data: orderClient } = useGetAllOrdersInAdminQuery()

console.log("orderClient",orderClient)


  const [userName, setUserName] = useState('')

  const { RangePicker } = DatePicker
  const [filterStatus, setFilterStatus] = useState('')

  const [changeStatusOrderFn, _] = useChangeStatusOrderMutation()
  const [dataOrder, setDataOrder] = useState<IOrderTable[]>([])
  const arrStatus = [
    { value: 'pending', label: 'Chờ xác nhận shop' },
    { value: 'waiting', label: 'Chờ vận chuyển' },
    { value: 'delivering', label: 'Đang vận chuyển' },
    { value: 'done', label: 'Thành công' },
    { value: 'cancel', label: 'Đã hủy' }
  ]

  const arrStatusFillter = [
    { value: '', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xác nhận shop' },
    { value: 'waiting', label: 'Chờ vận chuyển' },
    { value: 'delivering', label: 'Đang vận chuyển' },
    { value: 'done', label: 'Thành công' },
    { value: 'cancel', label: 'Đã hủy' }
  ]

  const handelChangeObject = (address: string) => {
    return JSON.parse(address)
  }



  // đổi trạng thái đơn hàng 
  const handleChangeStatus = async (data: { id: string; status: string }) => {
    changeStatusOrderFn(data).then((status: any) => {
      if (status.error) {
        notification.error({
          message: 'Lỗi',

          duration: 2
        })
      } else {
        notification.success({
          message: 'Đổi trạng thái đơn thành công',
          duration: 2
        })
      }
    })
  }



  
  const handeleOrder = (data: any[]) => {
    return data.map((order) => ({
      code: order._id,
      name: order?.user_id?.fullname ? order?.user_id?.fullname : order?.user?.name,
      status: order.status,
      address: order.address,
      product: order.products,
      moneny: order.total_price
    }))
  }
  useEffect(() => {
    let dataSource: any = []
    if (orderClient?.data) {
      dataSource = handeleOrder(orderClient?.data.data)
      setDataOrder(dataSource)
    }
  }, [orderClient])

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Người mua',
      dataIndex: 'name'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      render: (data: any) => {
        return <p>{handelChangeObject(data).address}</p>
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'address',
      render: (data: any) => {
        return <p>{handelChangeObject(data).phone}</p>
      }
    },
    {
      title: 'Số tiền',
      dataIndex: 'moneny',
      key: 'moneny',
      render: (data: number) => {
        return (
          <p>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(data)}
          </p>
        )
      }
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'product',
      render: (data: any) => {
        return <p>{data?.length}</p>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusLabel = arrStatus.find((item) => item.value === status)
        return statusLabel ? statusLabel.label : ''
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (order: any) => {
        return (
          <div className='flex items-center'>
            <Space size='middle'>
              {order.status === 'pending' && (
                <Button
                  icon={<CheckOutlined />}
                  onClick={() => {
                    handleChangeStatus({
                      id: order.code,
                      status: 'waiting'
                    })
                  }}
                />
              )}

              <Link to={`/admin/order/${order?.code}`} className='px-3  text-xl '>
                <Button icon={<EyeFilled />} />
              </Link>

              {order.status === 'waiting' && (
                <Button
                  icon={<IoCheckmarkDoneCircleSharp />}
                  onClick={() =>
                    handleChangeStatus({
                      id: order.code,
                      status: 'delivering'
                    })
                  }
                />
              )}
              {order.status === 'delivering' && (
                <Button
                  icon={<IoCheckmarkDoneCircleSharp />}
                  onClick={() =>
                    handleChangeStatus({
                      id: order.code,
                      status: 'done'
                    })
                  }
                />
              )}

              {order.status === 'pending' && (
                <Button
                  //  variant='danger'
                  icon={<CloseCircleFilled />}
                  onClick={() =>
                    handleChangeStatus({
                      id: order.code,
                      status: 'cancel'
                    })
                  }
                />
              )}
            </Space>
          </div>
        )
      }
    }
  ]

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value)
    if (orderClient?.data) {
      setDataOrder(
        handeleOrder(orderClient?.data?.data).filter((order) => (value == '' ? order : order.status == value))
      )
    }
  }

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value.trim())
  }
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log({ startDate: dateString[0], endDate: dateString[1] })
    const [startDate, endDate] = dateString
    if ((startDate && !endDate) || (startDate && endDate)) {
      const fm_Date = moment(startDate).startOf('day')
      const to_Date = moment(endDate).endOf('day')
      const targetDate = new Date(startDate)

      targetDate.setHours(0, 0, 0, 0)
      const targetEndDate = new Date(targetDate)
      targetEndDate.setHours(23, 59, 59, 999)
      if (startDate > endDate || fm_Date > to_Date) {
        toast.error('Ngày bắt đầu không thể lớn hơn ngày kết thúc')
      }
      if (orderClient?.data) {
        const dataSource = orderClient?.data.data.filter((item) => {
          const createdAt = moment(item.createdAt)
          return createdAt.isBetween(fm_Date, to_Date, null, '[]')
        })
        setDataOrder(handeleOrder(dataSource))
      }
    }
  }

  useDebounce(
    () => {
      if (orderClient?.data) {
        setDataOrder(
          handeleOrder(orderClient?.data.data).filter(
            (d) => d.code.includes(userName) || (d.name && d.name.toUpperCase().includes(userName.toUpperCase()))
          )
        )
      }
    },
    [userName, orderClient],
    800
  )
  return (
    <>
      <header>
        <div className='flex justify-between'>
          <TitlePage title='Quản lý hóa đơn' />
        </div>

        <div className='mt-2 flex'>
          <Input
            className='ml-3'
            value={userName}
            onChange={onChangeSearchName}
            placeholder='Tìm hóa đơn hoặc tên người mua'
            style={{ width: 200 }}
          />
          <RangePicker
            size='large'
            className='ml-3'
            onChange={onDateChange}
            disabledDate={(current) => current && current > moment().endOf('day')}
          />
        </div>

        <div className='mt-2 flex'>
          {arrStatusFillter.map((option) => (
            <Button
              key={option.value}
              type={filterStatus === option.value ? 'default' : 'link'}
              onClick={() => handleFilterStatus(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </header>

      <Table className='mt-4' dataSource={dataOrder} columns={columns} />
    </>
  )
}
