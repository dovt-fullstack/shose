import { useGetOrderByIdQuery } from '@/store/services/order.service'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>() // Get the product id from the URL parameters
  const { data: order, isLoading } = useGetOrderByIdQuery(String(id))
  if (isLoading) return <div>Loading...</div>
  const receiverInformation = JSON.parse(order?.data?.address ?? '')

  return (
    <div className='mx-5 px-20'>
      <h3 className='text-3xl text-[#17c6aa] font-bold tracking-wider my-5 mx-10'>Đơn Hàng</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 '>
        <div className='md:col-span-2 '>
          <div className='overflow-x-auto mx-10'>
            <table className=' table min-w-full divide-y-2 divide-gray-200 bg-white text-sm '>
              <thead className='ltr:text-left rtl:text-right  '>
                <tr>
                  <th className='whitespace-nowrap py-4 px-1 font-medium text-gray-900 text-left text:xs lg:text-xl'>
                    Ảnh
                  </th>
                  <th className='whitespace-nowrap py-4  px-1  font-medium text-gray-900 text-left text:xs lg:text-xl'>
                    Tên
                  </th>
                  <th className='whitespace-nowrap py-4 px-1  font-medium text-gray-900 text-left text:xs lg:text-xl'>
                    Số Lượng
                  </th>
                  <th className='whitespace-nowrap py-4 px-1  font-medium text-gray-900 text-left text:xs lg:text-xl'>
                    Giá
                  </th>
                  <th className='whitespace-nowrap py-4 px-1  font-medium text-gray-900 text-left text:xs lg:text-xl'>
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 '>
                {order?.data.products.map((item: any) => (
                  <tr className='' key={item.product._id}>
                    <td className='whitespace-nowrap font-medium text-gray-900 flex text-left py-4'>
                      <div className='relative w-[200px]'>
                        <img
                          className='w-full h-auto lg:w-40 object-cover md:w-40'
                          src={item.product.image[0]}
                          alt=''
                        />
                        <span className='text-xs absolute top-0 right-0 bg-green-400 p-1 text-white rounded-full hidden sm:block'>
                          50% OFF
                        </span>
                      </div>
                    </td>
                    <td className='whitespace-nowrap  text-gray-700 py-4 '>
                      <div className=' items-center '>
                        <p className='text-xs lg:text-xl md:text-xl'>{item.product.name}</p>
                        <div className='flex items-center gap-1'>
                          <span className='text-xs lg:text-base md:text-xl '>Màu:</span>
                          <span
                            className=' bg-yellow-500 flex  gap-3 rounded-full w-4 h-4 opacity-70'
                            style={{ background: item.color }}
                          ></span>
                        </div>
                      </div>
                      <span className='  gap-3 text-xs lg:text-base md:text-xl'>Size: {item.size}</span>
                    </td>
                    <td className='whitespace-nowrap text-gray-700 py-4 px-4'>{item.quantity}</td>
                    <td className=' whitespace-nowrap  text-gray-700  text-xs lg:text-xl md:text-xl py-4 px-1 '>
                      {item.product.price?.toLocaleString()} vnđ
                    </td>
                    <td className=' whitespace-nowrap  text-gray-700  text-xs lg:text-xl md:text-xl py-4 px-1 '>
                      {(item.product.price * item.quantity)?.toLocaleString()} vnđ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-span-1 mx-10 '>
          <div className='mt-4 border border-green-500 rounded-md p-2'>
            <h3 className='text-xl font-semibold'>Thông tin giao hàng</h3>

            <div className='mt-4 space-y-2'>
              <div>
                Trạng thái đơn:{' '}
                <span className='text-red-500'>
                  {order?.data.status === 'cancel'
                    ? 'Đã hủy'
                    : order?.data.status === 'waiting'
                      ? 'Chờ vận chuyển'
                      : order?.data.status === 'delivering'
                        ? 'Đang vận chuyển'
                        : 'Chờ xác nhận shop'}
                </span>
              </div>
              <div>
                Người mua: <b>{receiverInformation.name || ''} </b>
              </div>
              <div>
                Số điẹn thoại: <b>{receiverInformation.phone || ''}</b>
              </div>
              <div>
                Địa chỉ: <b>{receiverInformation.address || ''}</b>
              </div>
              <div>Tổng tiền đơn hàng: {order?.data?.total_price?.toLocaleString() || 0} vnd</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
