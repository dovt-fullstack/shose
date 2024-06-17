import { useGetProductByIdQuery } from '@/api/product'
import ImagePriview from '@/components/ImagePreview/ImagePreview'
import { CheckOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import TitlePage from '@/components/TitlePage/TitlePage'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IListQuantityRemain } from '@/interfaces/product'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()

  const { data: product, isLoading } = useGetProductByIdQuery(id || '')

  const [selectedColor, setSelectedColor] = useState<IListQuantityRemain>()

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      <header className='mb-4'>
        <TitlePage title='Chi tiết sản phẩm' />
      </header>

      {product && (
        <div className='big-content w-full md:w-4/5 mx-auto'>
          {/* name và rating */}
          <div className='name-rating mt-8 md:mt-10'>
            <div className='name-product mt-3'>
              <h1 className='title-name uppercase font-medium text-[#282828] text-2xl'>{product?.product.name}</h1>
            </div>
          </div>
          {/* Slide và content */}
          <div className='slider-text-content min-w-full  flex flex-col gap-5 mt-8 md:mt-10 md:flex-row justify-between  '>
            {/* slider */}
            <div className='slider w-full md:w-2/5 relative overflow-hidden '>
              <td className='whitespace-nowrap  text-gray-700 py-4 '>
                <div className='items-center '>
                  <p className='text-xs lg:text-base md:text-xl flex '>
                    <ImagePriview width={1000} listImage={product?.product.image || []} />
                  </p>
                </div>
              </td>

              {/* sale */}
              <div className='prd-sale absolute top-2 left-1 min-w-[75px]'>
                {Math.round(
                  ((product?.product.hot_sale - product?.product.price) / product?.product.hot_sale) * 100
                ) !== 0 && (
                  <div className=' py-[2px] bg-pink-600 my-1'>
                    <span className=' m-2 block  rounded-full text-center text-sm font-medium text-white'>
                      {Math.round(
                        ((product?.product.hot_sale - product?.product.price) / product?.product.hot_sale) * 100
                      )}
                      %
                    </span>
                  </div>
                )}
                <div className='prd-sale py-[2px] bg-blue-300'>
                  <span className=' m-2 block  rounded-full text-center text-sm font-medium text-white'>Mới</span>
                </div>
              </div>
            </div>
            {/* content */}
            <div className='text-content flex-1'>
              <div className='info-price flex flex-col md:flex-row gap-5 items-center'>
                <>
                  <h1 className='text-4xl font-normal'>{product?.product.price.toLocaleString('it-IT')}.vnđ</h1>
                  <div className='price-old'>
                    <h2 className='text-lg line-through'>{product?.product.hot_sale.toLocaleString('it-IT')}.vnđ</h2>
                    <p className='text-sm font-medium text-[#fb317d]'>
                      You Save:
                      {Math.round(
                        ((product?.product.hot_sale - product?.product.price) / product?.product.hot_sale) * 100
                      )}{' '}
                      %
                    </p>
                  </div>
                </>
              </div>
              <div className='info-desc mt-5'>
                <h2 className='text-lg font-medium'>Thông tin sản phẩm</h2>
                <p className='break-words mt-3 text-base text-[#282828]'>{product?.product.description}</p>
              </div>
              <hr className='bg-gray-300 h-1 mx-auto my-20' />
              <div className='options'>
                {/*name color*/}
                {selectedColor && (
                  <div className='quantity-remain flex items-center gap-10 mt-5'>
                    <ul className='flex flex-row items-start gap-2'>
                      <h2 className='text-lg font-medium'>Tên màu :</h2>
                      <li className='flex items-center gap-2'>
                        <div className='w-5 h-5 rounded-full border-black'>{selectedColor.nameColor}</div>
                      </li>
                    </ul>
                  </div>
                )}
                {/* color */}
                <div className='quantity-remain flex items-center gap-10 mt-5'>
                  <ul className='flex flex-row items-start gap-2'>
                    <h2 className='text-lg font-medium'>Màu :</h2>
                    {product?.product.listQuantityRemain
                      .filter((v, i, a) => a.findIndex((t) => t.colorHex === v.colorHex) === i)
                      .map((item: any, index: number) => (
                        <li
                          key={index}
                          className='flex items-center justify-center gap-2'
                          onClick={() => setSelectedColor(selectedColor === item ? null : item)}
                        >
                          <div
                            style={{ backgroundColor: item.colorHex }}
                            className='w-7 h-7 rounded-full flex items-center justify-center border '
                          >
                            {selectedColor === item && <CheckOutlined />}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* size */}
                <div className='quantity-remain flex items-center gap-10 mt-5'>
                  <ul className='flex flex-row items-start gap-2'>
                    <h2 className='text-lg font-medium'>Size :</h2>
                    {product?.product.listQuantityRemain
                      .filter((item) => !selectedColor || item.colorHex === selectedColor.colorHex)
                      .map((item: any, index: number) => (
                        <li key={index} className='flex items-center gap-2'>
                          <div className='w-7 h-7 border border-gray-500 flex items-center justify-center'>
                            {item.nameSize}
                          </div>{' '}
                        </li>
                      ))}
                  </ul>
                </div>
                {selectedColor && (
                  <div className='quantity-remain flex items-center gap-10 mt-5'>
                    <ul className='flex flex-col items-start gap-2'>
                      <h2 className='text-lg font-medium'>Số lượng :</h2>
                      <li className='flex items-center gap-2'>
                        <div className='w-4 h-4 rounded-full'> </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
