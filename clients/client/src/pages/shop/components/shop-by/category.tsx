import { ImPlus } from 'react-icons/im'
import { NavTitle } from '.'
import { useGetCategoriesQuery } from '@/store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFilterCategory } from '@/store/slices/CategorySilie'
const categoryDemo = [
  {
    _id: '1',
    name: 'Category 1'
  },
  {
    _id: '2',
    name: 'Category 2'
  },
  {
    _id: '3',
    name: 'Category 3'
  },
  {
    _id: '4',
    name: 'Category 4'
  },
  {
    _id: '5',
    name: 'Category 5'
  }
]

interface CategoryProps {
  onFilterCategory: (category: string) => void
}

export const Category = ({ onFilterCategory }: CategoryProps) => {
  const { isError, isFetching, data } = useGetCategoriesQuery()
  const dispath = useDispatch()

  const categoryId = (id: any) => {

    dispath(setFilterCategory(id))
    // onFilterCategory(id)
  }
  const [showSubCatOne, setShowSubCatOne] = useState<boolean>(false)

  if (isError) return <p>Error</p>
  if (isFetching) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <div className='w-full'>
      <NavTitle title='Thể loại sản phẩm' icons={false} />
      <div>
        <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
          {/* {data.data.map(({ _id, name }) => ( */}
          {data.data.map(({ _id, name }) => (
            <li
              key={_id}
              className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer'
              onClick={() => categoryId(_id)}
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
