import { Category, Price } from '.'

interface ShopSideNavProps {
  onFilterCategory: (category: string) => void
  onFilterPrice: (priceStart: number, priceLow: number) => void
}

export const ShopSideNav = ({ onFilterCategory, onFilterPrice }: ShopSideNavProps) => {
  return (
    <div className='flex flex-col w-full gap-6'>
      <Category onFilterCategory={onFilterCategory} />
      <Price onFilterPrice={onFilterPrice} />
    </div>
  )
}
