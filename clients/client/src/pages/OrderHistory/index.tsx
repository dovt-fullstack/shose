import { useGetAllOrdersQuery, useUpdateOrderMutation } from '@/store/services/order.service'

import Swal from 'sweetalert2'
import clsx from 'clsx'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/store'
import { useNavigate } from 'react-router-dom'

const OrderHistory = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user)
  const [updateOrder] = useUpdateOrderMutation()
  const userId = user?._id ?? ''
  const { data, isFetching, refetch } = useGetAllOrdersQuery(userId)

  if (!user || !user._id) {
    navigate('/')
  }
  // Laays thoong tin khi ddanwg nhap

  const handleCancel = (id: string) => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn chắc chắn muốn hủy đơn hàng chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateOrder({ _id: id._id, status: 'cancel' })
          .unwrap()
          .then(() => {
            refetch()
            toast.success('Hủy đơn hàng thành công')
          })
          .catch(() => {
            toast.error('Hủy đơn hàng thất bại, vui lòng thử lại sau')
          })
      }
    })
  }
  const handleFinish = (id: string) => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn chắc chắn muốn hoàn thành đơn hàng chứ!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        updateOrder({ _id: (id as any)._id, status: 'done' })
          .unwrap()
          .then(() => {
            refetch()
            toast.success('Hoàn thành đơn hàng thành công')
          })
      }
    })
  }
  const orderDetail = (id: string) => {
    navigate(`/my-order/${id}`)
  }
  return (
    <div className='mt-6 space-y-4'>
      {isFetching && <p>Loading...</p>}

      <div className='flex flex-col max-w-5xl mx-auto'>
        {data?.data.length === 0 && (
          <div className='text-center'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4MjBlJbA8hvcOCecVRCOcR5vjgd9buBo7Q&usqp=CAU'
              alt='Empty Cart'
              className='mx-auto'
            />
            <p>Lịch sử mua hàng của bạn trống rỗng.</p>
          </div>
        )}

        {data?.data.map((order: any) => {
          return (
            <div key={order._id} className='w-full'>
              <div className='flex flex-col items-center w-full px-4 py-2 m-auto mt-3 bg-white rounded-md'>
                <div className='flex flex-col items-start w-full pt-3 mb-3'>
                  <div className='flex gap-2'>
                    <span className='font-medium'>Trạng thái:</span>
                    <span
                      className={
                        order.status === 'cancel'
                          ? 'text-red-500'
                          : order.status === 'waiting'
                            ? 'text-yellow-500'
                            : order.status === 'delivering'
                              ? 'text-blue-500'
                              : order.status === 'done'
                                ? 'text-green-500'
                                : ''
                      }
                    >
                      {order.status === 'cancel'
                        ? 'Đã hủy'
                        : order.status === 'waiting'
                          ? 'Chờ vận chuyển'
                          : order.status === 'delivering'
                            ? 'Đang vận chuyển'
                            : order.status === 'done'
                              ? 'Giao hàng thành công'
                              : 'Chờ xác nhận'}
                    </span>
                  </div>
                  {/* <div className="flex gap-2">
                                    <span className="font-medium">Thanh toán:</span>
                                    <span className="text-red-500">Chưa thanh toán</span>
                                </div> */}
                </div>
                <div className='flex items-center w-full'>
                  <div className='flex flex-col flex-1 w-full gap-2'>
                    {order?.products?.map((product: any, index: number) => (
                      <div key={index} className='flex w-full gap-3'>
                        <span className='inline-block w-24 h-24'>
                          <img className='object-cover w-full h-full rounded-sm' src={product?.product?.image[0]} />
                        </span>
                        <div className='flex-1 '>
                          <h1 className='text-base font-bold'>{product?.product?.name}</h1>
                          <div className='flex gap-3 mt-1'>
                            <div
                              className='flex items-center justify-center rounded-full w-7 h-7'
                              style={{ backgroundColor: product?.color }}
                            ></div>
                            <p>Size: {product?.size}</p>
                          </div>
                          <div className='flex gap-3 mt-1'>
                            <span className='font-medium text-red-500'>
                              {product?.product?.price?.toLocaleString()} VNĐ
                            </span>
                            <p>x{product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className=''>
                    {order.status === 'pending' && (
                      <button
                        className={clsx('bg-red-500 px-3 py-2', order.status === 'cancel' && 'hidden', {
                          hidden: order.payment_type === 'bank'
                        })}
                        type='button'
                        onClick={() => handleCancel(order._id)}
                      >
                        <span>Hủy đơn hàng</span>
                      </button>
                    )}

                    {order.status === 'delivering' && (
                      <button
                        className={clsx('bg-red-500 px-3 py-2', order.status === 'cancel' && 'hidden')}
                        style={{ backgroundColor: 'green' }}
                        type='button'
                        onClick={() => handleFinish(order._id)}
                      >
                        <span>Đã nhận</span>
                      </button>
                    )}
                    <button
                      className='btn js-prd-addtocart ml-3 text-white bg-[#17c6aa] hover:bg-[#1b1a1a] rounded-sm px-4 py-2 font-semibold '
                      onClick={() => orderDetail(order._id._id)}
                    >
                      Chi tiết đơn hàng
                    </button>
                  </div>
                </div>
                <div className='flex flex-row items-end justify-between w-full gap-2 pt-3'>
                  <div>
                    <span>Ngày: </span>
                    <span>{new Date(order.createdAt).toLocaleDateString()} </span>
                  </div>
                  <div>
                    <span>Tổng tiền: </span>
                    <span>{order.total_price?.toLocaleString() || 0} VNĐ</span>
                  </div>
                </div>
              </div>
              <hr className='my-2' />{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistory
