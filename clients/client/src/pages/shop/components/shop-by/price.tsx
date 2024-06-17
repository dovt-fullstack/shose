import { NavTitle } from './nav-title'
import { priceList } from '../..'

interface PriceProps {
  onFilterPrice: (priceStart: number, priceLow: number) => void
}

export const Price = ({ onFilterPrice }: PriceProps) => {
  return (
    <div className='mt-10 cursor-pointer'>
      <NavTitle title='Shop by Price' icons={false} />
      <div className='font-titleFont'>
        <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
          {priceList.map((item) => (
            <li
              key={item._id}
              onClick={() => onFilterPrice(item.priceOne, item.priceTwo)}
              className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300'
            >
              {item.priceOne.toLocaleString()}đ - {item.priceTwo.toLocaleString()}đ
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
