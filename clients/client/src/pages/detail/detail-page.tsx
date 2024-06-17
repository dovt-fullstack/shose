import { useParams } from 'react-router-dom'
import { ProductInfo } from './components'

import { Breadcrumbs } from '@/components'
import { useGetProductByIdQuery, useGetProductsQuery } from '@/store'
import { IProduct } from '@/types'
import { useEffect, useState } from 'react'
import { Product } from '@/components/product'

export const DetailPage = () => {
  const { id } = useParams()
  const [productList, setProductList] = useState<IProduct[]>([])
  const { isError, isFetching, data } = useGetProductByIdQuery(id as string)

  const { data: productData } = useGetProductsQuery()

  useEffect(() => {
    if (productData && data) {
      setProductList(productData.products.filter((p) => p.categoryId == data?.product.categoryId))
    }
  }, [data, productData])

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    <div className='w-full mx-auto border-b-[1px] border-b-gray-300'>
      <div className='px-4 mx-auto max-w-container'>
        <div className='xl:-mt-10 -mt-7'>
          <Breadcrumbs title='' />
        </div>
        <div className='grid w-full h-full grid-cols-1 gap-4 p-4 pb-10 -mt-5 bg-gray-100 md:grid-cols-2 xl:grid-cols-6 xl:-mt-8'>
          {/* <div className='h-full'>
            <ProductsOnSale />
          </div> */}
          <div className='h-full xl:col-span-3'>
            <img
              className='object-cover w-full h-full'
              src={data?.product?.image[0]}
              alt={
                'https://sneakerdaily.vn/wp-content/uploads/2023/08/giay-new-balance-530-steel-grey-mr530ka.jpg.webp'
              }
            />
          </div>
          <div className='flex flex-col justify-center w-full h-full gap-6 md:col-span-2 xl:col-span-3 xl:p-14'>
            <ProductInfo productInfo={data?.product as IProduct} />
          </div>
        </div>
        <hr />
        <div className='pt-10 mt-10'>
          <h2 className='mb-4 text-3xl font-semibold'> Sản phẩm liên quan</h2>
          <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2 lgl:grid-cols-4 xl:grid-cols-4'>
            {productList
              ?.slice(0, 8)
              ?.map((product) => (
                <Product
                  key={product._id}
                  _id={product._id}
                  img={product.image[0]}
                  productName={product.name}
                  price={product.price}
                  color='Blank and White'
                  badge={true}
                  des={product.description}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
