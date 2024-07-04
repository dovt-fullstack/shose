import { decreQuantity, increaseQuantity } from '@/store/slices/cart.slice'

import { useAppDispatch } from '@/store'
import { ICart } from '@/types/cart.type'
import { ImCross } from 'react-icons/im'
import { message } from 'antd'

interface CartItemProps {
  data: ICart
  index: number
  handleRemove: (id: string) => void
}
export const CartItem = ({ index, data, handleRemove }: CartItemProps) => {
  const dispatch = useAppDispatch()
  const handleInCrease = (index: number) => {
    
    console.log("datadata",data)
    if (data.quantity >= data.maxQuantity) {

      message.error('Số lượng sản phẩm không đủ!')
      return
    }
    dispatch(increaseQuantity(index))
  }
  return (
    <div className='grid w-full grid-cols-5 py-2 mb-4 border'>
      <div className='flex items-center col-span-5 gap-4 ml-4 mdl:col-span-2'>
        <ImCross
          className='duration-300 cursor-pointer text-primeColor hover:text-red-500'
          onClick={() => handleRemove(data._id)}
        />
        <img className='w-32 h-32' src={data.image} alt={data.nameProduct} />
        <div className='flex flex-col gap-1'>
          <h1 className='font-semibold truncate font-titleFont'>{data.nameProduct}</h1>
          <p className='text-sm font-medium'>Size: {data.nameSize}</p>
        </div>
      </div>
      <div className='flex items-center justify-between col-span-5 gap-6 px-4 py-4 select-none mdl:col-span-3 mdl:py-0 mdl:px-0 mdl:gap-0'>
        <div className='flex items-center w-1/3 text-lg font-semibold'>{data.price.toLocaleString()}₫</div>
        <div className='flex items-center w-1/3 gap-6 text-lg'>
          <span
            className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'
            onClick={() => dispatch(decreQuantity(index))}
          >
            -
          </span>
          <p>{data.quantity}</p>
          <span
            className='w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300'
            onClick={() => handleInCrease(index)}
          >
            +
          </span>
        </div>
        <div className='flex items-center w-1/3 text-lg font-bold font-titleFont'>
          <p>{(data.price * data.quantity).toLocaleString()}₫</p>
        </div>
      </div>
    </div>
  )
}
