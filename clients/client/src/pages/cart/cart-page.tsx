import { Link, useNavigate } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '@/store'
import { removeMultiplePrdCart, removeProductToCart } from '@/store/slices/cart.slice'

import { Breadcrumbs } from '@/components'
import { CartItem } from './components'
import Swal from 'sweetalert2'
import { emptyCart } from '@/assets/images'
import { motion } from 'framer-motion'
import { useState } from 'react'

export const CartPage = () => {
  const [shippingCharge] = useState(20000)

  const { cart } = useAppSelector((state) => state.cart)
  console.log('🚀 ~ CartPage ~ cart:', cart)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const { user } = useAppSelector((state: RootState) => state)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRemove = (index: string, keyDelete = '') => {
    Swal.fire({
      position: 'center',
      title: 'Warning',
      text: 'Bạn muốn xóa sản phẩm khỏi giỏ hàng!!',
      icon: 'warning',
      confirmButtonText: 'Đồng ý',
      showDenyButton: true,
      returnInputValueOnDeny: false,
      denyButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (keyDelete == 'all') {
          dispatch(removeMultiplePrdCart())
        } else {
          dispatch(removeProductToCart(String(index)))
        }
      }
    })
  }

  const handlePayment = () => {
    if (!user?.user) {
      // Hiển thị thông báo yêu cầu đăng nhập trước khi thanh toán
      Swal.fire({
        icon: 'error',
        title: 'Yêu cầu đăng nhập trước khi thanh toán'
      })
      return
    }
    if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng chọn sản phẩm ',
        text: 'Vui lòng kiểm tra lại thông tin!'
      })
    } else {
      Swal.fire({
        position: 'center',
        title: 'Warning',
        text: 'Bạn muốn xác nhận thanh toán chứ!!',
        icon: 'warning',
        confirmButtonText: 'Đồng ý',
        showDenyButton: true,
        returnInputValueOnDeny: false,
        denyButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem(
            'infoPayment',
            JSON.stringify({ cartSelected: cart, length: cart.length, totalPrice: total })
          )
          navigate('/order')
        }
      })
    }
  }

  return (
    <div className='px-4 mx-auto max-w-container'>
      <Breadcrumbs title='Cart' />
      {cart && cart.length > 0 ? (
        <div className='pb-20'>
          <div className='w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold'>
            <h2 className='col-span-2'>Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className='mt-5'>
            {cart.map((item, index) => (
              <div key={index}>
                <CartItem data={item} index={index} handleRemove={handleRemove} />
              </div>
            ))}
          </div>

          <button
            className='px-10 py-2 mb-4 font-semibold text-white uppercase duration-300 bg-red-500 hover:bg-red-700'
            onClick={() => cart.map((item) => handleRemove(item._id, 'all'))}
          >
            Reset cart
          </button>

          <div className='flex-col items-center justify-between hidden gap-2 px-4 py-4 border mdl:flex-row mdl:gap-0'>
            <div className='flex items-center gap-4'>
              <input
                className='h-8 px-4 text-sm border border-gray-400 outline-none w-44 mdl:w-52 text-primeColor'
                type='text'
                placeholder='Coupon Number'
              />
              <p className='text-sm font-semibold mdl:text-base'>Apply Coupon</p>
            </div>
            <p className='text-lg font-semibold'>Update Cart</p>
          </div>
          <div className='flex justify-end gap-4 mt-4 max-w-7xl'>
            <div className='flex flex-col gap-4 w-96'>
              <h1 className='text-2xl font-semibold text-right'>Cart totals</h1>
              <div>
                <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                  Subtotal
                  <span className='font-semibold tracking-wide font-titleFont'>{total.toLocaleString()}đ</span>
                </p>
                <p className='flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium'>
                  Shipping Charge
                  <span className='font-semibold tracking-wide font-titleFont'>${shippingCharge}</span>
                </p>
                <p className='flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium'>
                  Total
                  <span className='text-lg font-bold tracking-wide font-titleFont'>
                    {(Number(total) + Number(shippingCharge)).toLocaleString()}đ
                  </span>
                </p>
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={handlePayment}
                  className='text-xl mb-2 bg-[#17c6aa] text-white h-10 w-full flex items-center justify-center font-sans hover:bg-black hover:text-white'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className='flex flex-col items-center justify-center gap-4 pb-20 mdl:flex-row'
        >
          <div>
            <img className='p-4 mx-auto rounded-lg w-80' src={emptyCart} alt='emptyCart' />
          </div>
          <div className='max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg'>
            <h1 className='text-xl font-bold uppercase font-titleFont'>Your Cart feels lonely.</h1>
            <p className='px-10 -mt-2 text-sm text-center'>
              Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics, videos, etc. and
              make it happy.
            </p>
            <Link to='/shop'>
              <button className='px-8 py-2 text-lg font-semibold text-gray-200 duration-300 rounded-md cursor-pointer bg-primeColor hover:bg-black active:bg-gray-900 font-titleFont hover:text-white'>
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
