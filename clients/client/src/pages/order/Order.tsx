import { Button, Input, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { useDecreaseSaleMutation, useGetAllSalesQuery } from '@/store/services/sale'
import { useEffect, useState } from 'react'

import { FormatCurrency } from '@/utils/FormatCurrency'
import { ICart } from '@/types/cart.type'
import { ISale } from '@/types/payment'
import Swal from 'sweetalert2'
import axios from 'axios'
import clsx from 'clsx'
import { removeMultiplePrdCart } from '@/store/slices/cart.slice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useNewOrderMutation } from '@/store/services/order.service'
import { usePaymentByVNpayMutation } from '@/store/services/paymentServices'

const Orderr = () => {
  const [selectedSale, setSelectedSale] = useState<ISale>()
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'banking'>('banking')
  const [address, setAddress] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [voucherValue, setVoucherValue] = useState('')
  const currentDate = new Date()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetAllSalesQuery()

  const [infoCart, setInfoCart] = useState<any>()

  const { user } = useAppSelector((state) => state)

  // const [searchParams] = useSearchParams()
  const [newOrder] = useNewOrderMutation()
  const [decreaseSale] = useDecreaseSaleMutation()
  const [shouldShowDiscountButton, setShouldShowDiscountButton] = useState(true)

  const [vnPayFn, vnPayRes] = usePaymentByVNpayMutation()

  useEffect(() => {
    if (vnPayRes.error) {
      message.error((vnPayRes.error as any).data.message)
    }
  }, [vnPayRes])
  useEffect(() => {
    if (user) {
      setAddress(user.user?.addressUser[0] || '')
      setPhone(user.user?.phone || '')
      setName(user.user?.fullname || '')
    }
  }, [user])

  useEffect(() => {
    if (sessionStorage.getItem('infoPayment') == null) {
      navigate('/')
    }
    const _infoCart = JSON.parse(sessionStorage.getItem('infoPayment') || '')
    if (_infoCart) setInfoCart(_infoCart)
  }, [])

  const filteredDataVoucher =
    data?.data.filter(function (item: any) {
      // Chuyển đổi expirationDate thành đối tượng Date
      const expirationDate = new Date(item.expirationDate)

      // Kiểm tra nếu expirationDate lớn hơn hoặc bằng ngày hiện tại và usageLimit lớn hơn 0
      return expirationDate >= currentDate && item.usageLimit > 0
    }) ?? []

  const handlePickSale = (sale: ISale) => {
    if (selectedSale?._id === sale._id) return setSelectedSale({} as any)
    setVoucherValue(sale.code ?? '')
    setSelectedSale(sale)
  }

  const removeVoucher = () => {
    setShouldShowDiscountButton(!shouldShowDiscountButton)
    return setSelectedSale({} as any)
  }

  const addVoucher = async () => {
    if (voucherValue && voucherValue !== '') {
      try {
        const response = await axios.get(`http://localhost:8080/api/sales/get-by-code/${voucherValue}`)

        if (response.data.data) {
          const voucher = response.data.data
          const expirationDateVocher = new Date(voucher.expirationDate)
          if (voucher.quantity === -1 || expirationDateVocher < currentDate) {
            // Kiểm tra số lượng giảm giá
            Swal.fire({
              icon: 'error',
              title: "Giảm giá '" + voucherValue + "' đã hết hiệu lực",
              text: 'Vui lòng chọn một mã giảm giá khác!'
            })
            return
          }

          if (selectedSale?._id === voucher._id) return setSelectedSale({} as any)
          setShouldShowDiscountButton(!shouldShowDiscountButton)
          setSelectedSale(voucher)
        } else {
          Swal.fire({
            icon: 'error',
            title: "Mã giảm giá '" + voucherValue + "' không hiệu lực",
            text: 'Vui lòng kiểm tra lại thông tin!'
          })
        }
      } catch (error) {
        console.error('Error fetching sale by code:', error)
      }
    }
  }

  const formatPaymentOrder = (infoCart: any) => {
    const transformedArray = infoCart?.cartSelected.map((item: any) => {
      return {
        product_id: item._id,
        color: item.nameColor,
        size: item.nameSize,
        quantity: item.quantity
      }
    })

    const dataCreateCart = {
      user_id: user ? user.user?._id : '',
      status: 'pending',
      products: transformedArray,
      total_price: Number(infoCart?.totalPrice - saleMoney) + 20000,
      address: JSON.stringify({ name: name, phone: phone, address: address }),
      total_amount_paid: 0,
      payment_type: 'cash'
    }

    // Kiểm tra xem selectedSale._id có tồn tại không

    return dataCreateCart
  }
  const handlePayment = () => {
    if (address == '') {
      toast.error('Vui lòng nhập địa chỉ')
    } else if (name == '') {
      toast.error('Vui lòng nhập họ và tên người nhận')
    } else if (phone == '') {
      toast.error('Vui lòng nhập số điẹn thoại người nhận')
    } else {
      sessionStorage.setItem('address', JSON.stringify({ name: name, phone: phone, address: address }))
      Swal.fire({
        position: 'center',
        title: 'Bạn chắc chắc muốn đặt hàng chứ?',
        text:
          paymentMethod === 'banking'
            ? 'Bạn sẽ không thể hoàn lại được tiền khi thanh toán bằng hình thức này!'
            : 'Bạn chắc chắn muốn thanh toán chứ?',
        icon: 'warning',
        confirmButtonText: 'Đồng ý',
        showDenyButton: true,
        returnInputValueOnDeny: false,
        denyButtonText: 'Cancel'
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            if (paymentMethod === 'banking') {
              const res = await vnPayFn({
                inforOrderShipping: {
                  name,
                  email: user?.user?.email || '',
                  phone,
                  address
                },
                items: infoCart?.cartSelected,
                moneyPromotion: {
                  price: saleMoney
                },
                noteOrder: '',
                paymentMethodId: '',
                priceShipping: '',
                total: infoCart?.totalPrice - saleMoney + 20000 || 0,
                user: user?.user?._id || ''
              })
              sessionStorage.setItem(
                'infoPayment',
                JSON.stringify({ ...infoCart, totalPrice: infoCart?.totalPrice - saleMoney + 20000 || 0 })
              )
              window.open((res as any).data.url, '_self')
            }

            if (paymentMethod == 'cash') {
              const dataCreateOrder = formatPaymentOrder(infoCart)

              const response = await newOrder(dataCreateOrder as any).unwrap()

              if (response) {
                dispatch(removeMultiplePrdCart(infoCart?.cartSelected?.map((cart: any) => cart._id) as any))

                navigate('/order-history')
                toast.success('Đặt hàng thành công')
                if (selectedSale) {
                  decreaseSale(selectedSale._id)
                }
                sessionStorage.removeItem('infoPayment')
                navigate('/order-history')
              }
            }
          }
        } catch (error: any) {
          toast.error(error?.data?.message)
        }
      })
    }
  }

  // const saleMoney = 0;
  const saleMoney = selectedSale?._id
    ? selectedSale?.type === 'cash'
      ? +selectedSale?.sale
      : (infoCart?.totalPrice * +selectedSale.sale) / 100
    : 0

  return (
    <div className='mx-5'>
      <h3 className='text-x text-[#222] text-center font-bold tracking-wider my-5'>Thông Tin đặt Hàng</h3>
      <div className='sm:flex sm:flex-row'>
        <div className='w-full p-10 mb-5 mr-5 border sm:w-6/12'>
          <h4 className='text-xl text-[#222]  font-bold tracking-wider my-2'>Thông tin người đặt</h4>
          <div className='mt-2 '>
            <label className='mb-3' htmlFor=''>
              Họ và tên:
            </label>
            <Input
              placeholder='Họ và tên:..'
              className='w-full p-3 '
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mt-2 '>
            <label className='mb-3' htmlFor=''>
              Số Điện Thoại
            </label>
            <Input
              placeholder='Số điện thoại..'
              className='w-full p-3 '
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='mt-2 '>
            <label className='mb-3' htmlFor=''>
              Địa chỉ
            </label>
            <Input
              placeholder='Địa chỉ..'
              className='w-full p-3 '
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className='w-full p-10 border sm:w-6/12'>
          <h3 className='text-xl text-[#222] font-bold tracking-wider my-2'>Hình Thức Thanh Toán</h3>
          <fieldset className='space-y-4'>
            <legend className='sr-only'>Thanh toán trực tuyến</legend>
            <div>
              <input
                type='radio'
                name='DeliveryOption'
                value='DeliveryStandard'
                id='DeliveryStandard'
                className='peer hidden [&:checked_+_label_svg]:block'
                defaultChecked
                onClick={() => setPaymentMethod('banking')}
              />

              <label
                htmlFor='DeliveryStandard'
                className='flex items-center justify-between p-4 text-sm font-medium bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500'
              >
                <div className='flex items-center gap-2'>
                  <svg
                    className='hidden w-5 h-5 text-blue-600'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>

                  <p className='text-gray-700'>Thanh Toán trực Tuyến</p>
                </div>
              </label>
            </div>

            <div>
              <input
                type='radio'
                name='DeliveryOption'
                value='DeliveryPriority'
                id='DeliveryPriority'
                className='peer hidden [&:checked_+_label_svg]:block'
                onClick={() => setPaymentMethod('cash')}
              />

              <label
                htmlFor='DeliveryPriority'
                className='flex items-center justify-between p-4 text-sm font-medium bg-white border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500'
              >
                <div className='flex items-center gap-2'>
                  <svg
                    className='hidden w-5 h-5 text-blue-600'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>

                  <p className='text-gray-700'>Thanh Toán Khi Nhận Được Hàng</p>
                </div>
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <h3 className='text-3xl text-[#17c6aa] font-bold tracking-wider my-5 mx-10'>Đơn Hàng</h3>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 '>
        <div className='md:col-span-2 '>
          <div className='mx-10 overflow-x-auto'>
            <table className='table min-w-full text-sm bg-white divide-y-2 divide-gray-200 '>
              <thead className='ltr:text-left rtl:text-right '>
                <tr>
                  <th className='px-1 py-4 font-medium text-left text-gray-900 whitespace-nowrap text:xs lg:text-xl'>
                    Ảnh
                  </th>
                  <th className='px-1 py-4 font-medium text-left text-gray-900 whitespace-nowrap text:xs lg:text-xl'>
                    Tên
                  </th>
                  <th className='px-1 py-4 font-medium text-left text-gray-900 whitespace-nowrap text:xs lg:text-xl'>
                    Số Lượng
                  </th>
                  <th className='px-1 py-4 font-medium text-left text-gray-900 whitespace-nowrap text:xs lg:text-xl'>
                    Giá
                  </th>
                  <th className='px-1 py-4 font-medium text-left text-gray-900 whitespace-nowrap text:xs lg:text-xl'>
                    Thành tiền
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 '>
                {infoCart?.cartSelected?.map((cart: ICart) => (
                  <tr className='' key={cart._id}>
                    <td className='flex py-4 font-medium text-left text-gray-900 whitespace-nowrap'>
                      <div className='relative w-[200px]'>
                        <img className='object-cover w-full h-auto lg:w-40 md:w-40' src={cart?.image} alt='' />
                      </div>
                    </td>
                    <td className='py-4 text-gray-700 whitespace-nowrap '>
                      <div className='items-center '>
                        <p className='text-xs lg:text-xl md:text-xl'>{cart.nameProduct}</p>
                        <div className='flex items-center gap-1'>
                          <span className='text-xs lg:text-base md:text-xl '>Màu:</span>
                          <span
                            className='flex w-4 h-4 gap-3 bg-yellow-500 rounded-full opacity-70'
                            style={{
                              background: cart.nameColor
                            }}
                          ></span>
                        </div>
                      </div>
                      <span className='gap-3 text-xs lg:text-base md:text-xl'>Size: {cart.nameSize}</span>
                    </td>
                    <td className='px-4 py-4 text-gray-700 whitespace-nowrap'>{cart.quantity}</td>
                    <td className='px-1 py-4 text-xs text-gray-700 whitespace-nowrap lg:text-xl md:text-xl'>
                      {FormatCurrency(cart.price)}
                    </td>
                    <td className='px-1 py-4 text-xs text-gray-700 whitespace-nowrap lg:text-xl md:text-xl'>
                      {FormatCurrency(cart.price * cart.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-span-1 mx-10 '>
          <div className='py-2 border border-green-500 rounded-md'>
            <h3 className='px-2 text-xl font-semibold'>Mã giảm giá</h3> <br></br>
            <Input
              placeholder='Mã giảm giá..'
              className='w-full p-3 '
              value={voucherValue}
              onChange={(e) => setVoucherValue(e.target.value)}
            />{' '}
            <br></br>
            <br></br>
            {shouldShowDiscountButton ? (
              <Button type='primary' className='bg-[#30bf3e] text-white' style={{ width: '100%' }} onClick={addVoucher}>
                Chọn mã giảm giá
              </Button>
            ) : (
              <Button type='primary' danger style={{ width: '100%' }} onClick={removeVoucher}>
                Xóa mã giảm giá
              </Button>
            )}
            {
              <div className='max-h-[200px] overflow-y-auto space-y-2 px-2'>
                {filteredDataVoucher.map((sale) => {
                  if (infoCart?.totalPrice < 100000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                  if (infoCart?.totalPrice < 500000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                  if (infoCart?.totalPrice < 1000000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                  if (infoCart?.totalPrice < 2000000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                  if (infoCart?.totalPrice < 3000000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                  if (infoCart?.totalPrice < 100000000) {
                    // map ra các mã giảm giá có giá trị nhỏ hơn tổng tiền đơn hàng
                    if (sale.sale < infoCart?.totalPrice) {
                      return (
                        <div
                          className={clsx(
                            'cursor-pointer hover:bg-green-200 mt-4 border border-green-500 rounded-md p-2',
                            selectedSale?._id === sale._id && 'bg-green-500'
                          )}
                          key={sale._id}
                          onClick={() => handlePickSale(sale)}
                        >
                          <span>{sale.name}</span>
                          <div className='flex justify-between mt-1'>
                            <span>- {sale.type === 'cash' ? FormatCurrency(+sale.sale) : sale.sale + '%'}</span>
                            <span>sl: {sale.usageLimit}</span>
                          </div>
                        </div>
                      )
                    }
                  }
                })}
              </div>
            }
          </div>

          <div className='p-2 mt-4 border border-green-500 rounded-md'>
            <h3 className='text-xl font-semibold'>Thông tin thanh toán</h3>

            <div className='mt-4 space-y-2'>
              <div>Tổng tiền đơn hàng: {FormatCurrency(infoCart?.totalPrice) || 0} </div>
              <div>
                Mã giảm giá: {selectedSale?.name} ({FormatCurrency(selectedSale ? +selectedSale?.sale : 0)})
              </div>
              <div>Tổng tiền giảm giá: {FormatCurrency(saleMoney) || 0} </div>
              <div>Tổng tiền phải thanh toán: {FormatCurrency(infoCart?.totalPrice - saleMoney)} </div>
            </div>
          </div>

          <div className='col-span-1 mt-4 '>
            <div className=''>
              <div className='p-2 border-2'>
                <h3 className='px-3 font-bold'>Thông tin điều khoản </h3>
                <div className='flex-col m-5'>
                  Bằng cách đặt đơn hàng, bạn dồng ý với điều khoản sủ dụng và bán hàng của sneakerStore và xác nhận
                  rằng bạn đã đọc chính sách quyền riêng tư{' '}
                </div>
              </div>
              <div className='flex justify-between mt-20 mb-4 '>
                <span className='text-2xl font-bold'>Tổng ({infoCart?.length || 0} mặt hàng) </span>
                <span className='ml-auto text-2xl'>
                  {' '}
                  {infoCart?.length > 0 ? FormatCurrency(infoCart?.totalPrice - saleMoney) : 0}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className='text-xl mb-2 bg-[#17c6aa] text-white h-[60px] w-full flex items-center justify-center font-sans hover:bg-black hover:text-white'
              >
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orderr
