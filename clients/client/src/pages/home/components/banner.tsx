import { bannerImgOne, bannerImgThree, bannerImgTwo } from '@/assets/images'

import { Image } from '@/components'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useSettingBanner } from '../hooks'

export const Banner = () => {
  const { settings } = useSettingBanner()
  return (
    <div className='w-full bg-white'>
      <Slider {...settings}>
        <Link to='/offer'>
          <div>
            <Image imgSrc={bannerImgOne} />
          </div>
        </Link>
        <Link to='/offer'>
          <div>
            <Image imgSrc={bannerImgTwo} />
          </div>
        </Link>
        <Link to='/offer'>
          <div>
            <Image imgSrc={bannerImgThree} />
          </div>
        </Link>
      </Slider>
    </div>
  )
}
