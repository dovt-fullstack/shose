import { BannerBottom, Sale } from './components'

import { BestSeller } from './components/best-seller'

const HomePage = () => {
  return (
    <div className='w-full mx-auto'>
      <Sale />
      <BannerBottom />
      <div className='max-w-container mx-auto px-4'>
        <BestSeller />
      </div>
    </div>
  )
}

export default HomePage
