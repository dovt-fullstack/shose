import { ImPlus } from 'react-icons/im'
import { NavTitle } from '.'
import { useGetCategoriesQuery } from '@/store'
import { useState } from 'react'

interface CategoryProps {
  onFilterCategory: (category: string) => void
}

export const Category = ({ onFilterCategory }: CategoryProps) => {
  const { isError, isFetching, data } = useGetCategoriesQuery()

  const [showSubCatOne, setShowSubCatOne] = useState<boolean>(false)

  if (isError) return <p>Error</p>
  if (isFetching) return <p>Loading...</p>
  if (!data) return <p>No data</p>
  return (
    <div className='w-full'>
      <NavTitle title='Shop by Category' icons={false} />
      <div>
        <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
          {data.data.map(({ _id, name }) => (
            <li
              key={_id}
              className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer'
              onClick={() => onFilterCategory(_id)}
            >
              {name}
              {true && (
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className='text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300'
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
