import { Link } from 'react-router-dom'
import { MdSwitchAccount } from 'react-icons/md'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { useAppSelector } from '@/store'

export const SpecialCase = () => {
  const products = []
  const { user } = useAppSelector((state) => state.user)
  return (
    <div className='fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2'>
      <Link to={!user ? '/signin' : '/profile'}>
        <div className='bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer'>
          <div className='flex justify-center items-center'>
            <MdSwitchAccount className='text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200' />

            <MdSwitchAccount className='text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200' />
          </div>
          <p className='text-xs font-semibold font-titleFont'>Thông tin</p>
        </div>
      </Link>
      <Link to='/cart'>
        <div className='bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative'>
          <div className='flex justify-center items-center'>
            <RiShoppingCart2Fill className='text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200' />

            <RiShoppingCart2Fill className='text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200' />
          </div>
          <p className='text-xs font-semibold font-titleFont'>Mua sắm</p>
          {products.length > 0 && (
            <p className='absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold'>
              {products.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
