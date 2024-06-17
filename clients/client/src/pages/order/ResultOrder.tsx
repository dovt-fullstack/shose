import { Button, Result } from 'antd'
import { useEffect, useState } from 'react'
import ConFetti from 'react-confetti'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { useNewOrderMutation } from '@/store/services/order.service'
import { toast } from 'react-toastify'
import { removeMultiplePrdCart } from '@/store/slices/cart.slice'

const PaymentResult = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [second, _] = useState<number>(5)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const user = useAppSelector((state) => state.user)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [orderAPIFn, orderAPIRes] = useNewOrderMutation()

  const [searchParams] = useSearchParams()

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    if (orderAPIRes.error) {
      toast.error((orderAPIRes as any).error.data.message)
      navigate('/order')
    }
  }, [navigate, orderAPIRes])

  const PaymentResult = () => {
    return Number(searchParams.get('vnp_ResponseCode')) == 24 ? (
      <div className='min-h-[50vh] overflow-hidden'>
        <ConFetti
          className={`transition-opacity duration-1000 pointer-events-none ${second <= 0 ? 'opacity-0 ' : ''}`}
          width={windowWidth}
          height={window.innerHeight}
        />
        <div className='mt-20'>
          <div className='my-0 mx-auto bg-white rounded-lg'>
            <div className='flex justify-center items-center'>
              <Result
                className='bg-white  shadow-lg rounded-xl w-[calc(100%-20px)] md:w-max'
                status='error'
                title='Bạn đã hủy thanh toán giao dịch thành công 🎉'
                subTitle='Nếu bạn muốn mua hàng thì bấm nút bên dưới nhé! 😃'
                extra={[
                  <Button
                    size='large'
                    key='buy'
                    className='hover:!bg-transparent hover:!text-[#D8B979] hover:!border-[#D8B979]'
                    onClick={() => navigate('/shop')}
                  >
                    Tiếp tục mua hàng
                  </Button>
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className='min-h-[50vh] overflow-hidden'>
        <ConFetti
          className={`transition-opacity duration-1000 pointer-events-none ${second <= 0 ? 'opacity-0 ' : ''}`}
          width={windowWidth}
          height={window.innerHeight}
        />
        <div className='mt-20'>
          <div className='my-0 mx-auto bg-white rounded-lg'>
            <div className='flex justify-center items-center'>
              <Result
                className='bg-white  shadow-lg rounded-xl w-[calc(100%-20px)] md:w-max'
                status='success'
                title='Chúc mừng bạn đã đặt hàng thành công 🎉'
                subTitle='Đơn hàng đang được xử lý.Quá trình này sẽ mất 1 chút thời gian,bạn vui lòng đợi nhé!'
                extra={[
                  user && user.user?._id && (
                    <Button
                      size='large'
                      className='bg-[#D8B979] hover:!bg-transparent hover:!text-[#D8B979] hover:border-[#D8B979]'
                      type='primary'
                      key='console'
                      onClick={() => navigate(`/profile/my-order`)}
                    >
                      Xem đơn hàng
                    </Button>
                  ),
                  <Button
                    size='large'
                    key='buy'
                    className='hover:!bg-transparent hover:!text-[#D8B979] hover:!border-[#D8B979]'
                    onClick={() => navigate('/shop')}
                  >
                    Tiếp tục mua hàng
                  </Button>
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const [infoCart, setInfoCart] = useState<any>()

  useEffect(() => {
    if (sessionStorage.getItem('infoPayment') == null) {
      navigate('/')
    }
    const _infoCart = JSON.parse(sessionStorage.getItem('infoPayment') || '')
    if (_infoCart) setInfoCart(_infoCart)
  }, [navigate])

  useEffect(() => {
    if (!searchParams.get('userId')) {
      navigate('/')
    }
    const date = new Date()
    if (searchParams.get('expire')) {
      if (Number(searchParams.get('expire')) < date.getTime()) {
        navigate('/')
        toast.error('Xin lỗi đã có vấn đề về đặt hàng của bạn')
      } else {
        if (Number(searchParams.get('vnp_ResponseCode')) != 24) {
          const data1 = {
            user_id: user ? user.user?._id : '',
            status: 'pending',
            products: infoCart?.cartSelected.map((item: any) => ({
              product_id: item._id,
              color: item.nameColor,
              size: item.nameSize,
              quantity: item.quantity
            })),
            total_price: infoCart?.totalPrice,
            address: sessionStorage.getItem('address'),
            total_amount_paid: 0,
            payment_type: 'bank'
          }
          orderAPIFn(data1)
            .unwrap()
            .then((res: any) => {
              if (res?.error) {
                return toast.error('Xin lỗi đã có vấn đề về đặt hàng của bạn' + res?.error?.data?.message)
              } else {
                sessionStorage.removeItem('infoPayment')
                sessionStorage.removeItem('address')
                dispatch(removeMultiplePrdCart(infoCart?.cartSelected?.map((cart: any) => cart._id) as any))
                // navigate('/order-history')
              }
            })
        }
      }
    }

    window.onresize = () => handleWindowResize()
  }, [dispatch, infoCart, navigate, orderAPIFn, searchParams, second, user, windowWidth])

  return PaymentResult()
}

export default PaymentResult
