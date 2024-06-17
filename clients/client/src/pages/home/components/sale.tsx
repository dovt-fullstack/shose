import { Image } from '@/components'
import { Link } from 'react-router-dom'

export const Sale = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-4 py-20 md:flex-row lg:gap-10'>
      <div className='flex flex-col w-full h-auto gap-4 md:w-2/3 lg:w-1/2 lg:gap-10'>
        <div className='w-full h-1/2'>
          <Link to='/shop'>
            <Image
              className='object-cover w-full h-full'
              imgSrc='https://res.cloudinary.com/dcwdrvxdg/image/upload/v1713628801/8_3.png_u8iq1u.webp'
            />
          </Link>
        </div>
        <div className='w-full h-1/2'>
          <Link to='/shop'>
            <Image
              className='object-cover w-full h-full'
              imgSrc={'https://res.cloudinary.com/dcwdrvxdg/image/upload/v1713628625/2.png_hqp77o.webp'}
            />
          </Link>
        </div>
      </div>
      <div className='flex flex-col w-full h-auto gap-4 md:w-2/3 lg:w-1/2 lg:gap-10'>
        <div className='w-full h-1/2'>
          <Link to='/shop'>
            <Image
              className='object-cover w-full h-full'
              imgSrc='https://res.cloudinary.com/dcwdrvxdg/image/upload/v1713628625/5.png_uxkfxd.webp'
            />
          </Link>
        </div>
        <div className='w-full h-1/2'>
          <Link to='/shop'>
            <Image
              className='object-cover w-full h-full'
              imgSrc={'https://res.cloudinary.com/dcwdrvxdg/image/upload/v1713628625/banner.png_oi1ppw.webp'}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
