import { FormatCurrency } from '@/utils/FormatCurrency'
import { Table } from 'antd'
import { useGetOrderByIdQuery } from '@/store/services/order.service'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>() // Get the product id from the URL parameters
  const { data: order } = useGetOrderByIdQuery(String(id))

  const arrStatus = [
    { value: 'pending', label: 'Chờ xác nhận shop' },
    { value: 'waiting', label: 'Chờ vận chuyển' },
    { value: 'delivering', label: 'Đang vận chuyển' },
    { value: 'done', label: 'Thành công' },
    { value: 'cancel', label: 'Đã hủy' }
  ]

  const dataSource = order?.data.products.map((item) => {
    return {
      key: item.product._id,
      image: item.product.image,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size
    }
  })

  const handelChangeObject = (address: string) => {
    return address ? JSON.parse(address) : ''
  }

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (image: string[]) => {
        return (
          <td className='py-4 text-gray-700 whitespace-nowrap '>
            <div className='items-center '>
              <p className='flex text-xs lg:text-base md:text-xl '>
                <img width={100} src={image[0]} />
              </p>
            </div>
          </td>
        )
      }
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      render: (color: string) => {
        return (
          <div
            className={`rounded-full bg-[${color}]`}
            style={{
              width: 20,
              height: 20
            }}
          ></div>
        )
      }
    },
    {
      title: 'Kích cỡ',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: 'Giá cả',
      dataIndex: 'price',
      render: (price: number) => {
        return <p>{FormatCurrency(price)}</p>
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: ({ price, quantity }: any) => {
        return <p>{FormatCurrency(price * quantity)}</p>
      }
    }
  ]

  return (
    <div className='px-20'>
      <header>
        <div className='flex justify-between'>
          <TitlePage title='Chi tiết hóa đơn' />
        </div>
      </header>
      <table className='table-auto'>
        <tr>
          <th className='text-left' style={{ width: 200 }}>
            Mã đơn hàng:
          </th>
          <td>{id}</td>
        </tr>
        <tr>
          <th className='text-left'>Người mua: </th>
          <td>{order?.data.user?.fullname}</td>
        </tr>
        <tr>
          <th className='text-left'>Địa chỉ: </th>
          <td>{order && handelChangeObject(order?.data.address).address}</td>
        </tr>
        {order?.data.payment_type == 'bank' && (
          <tr>
            <th className='text-left'>Loại thanh toán: </th>
            <td>Thanh toán trực tuyến</td>
          </tr>
        )}
        <tr>
          <th className='text-left'>Trạng thái: </th>
          <td>{arrStatus.find((item) => item.value === order?.data.status)?.label}</td>
        </tr>
        <tr>
          <th className='text-left'>Tổng tiền: </th>
          <td>{order?.data.total_price && FormatCurrency(order?.data.total_price)}</td>
        </tr>
      </table>
      <Table className='mt-4' dataSource={dataSource} columns={columns} />
    </div>
  )
}

interface Props {
  title: string
}
function TitlePage({ title }: Props) {
  return (
    <header className='flex items-center justify-between mb-4'>
      <h2 className='text-2xl'>{title}</h2>
    </header>
  )
}

export default OrderDetail
