import { useParams } from 'react-router-dom'
import { ProductInfo } from './components'

import { Breadcrumbs } from '@/components'
import { useAppSelector, useGetProductByIdQuery, useGetProductsQuery } from '@/store'
import { IProduct } from '@/types'
import { useEffect, useState } from 'react'
import { Product } from '@/components/product'
import { useGetCommentQuery } from '@/store/comments'
import axios from 'axios'
import { RootState } from '@reduxjs/toolkit/query'

export const DetailPage = () => {
  const { user } = useAppSelector((state: any) => state)
  // console.log("user", user.user.fullname)

  const { id } = useParams()
  const [productList, setProductList] = useState<IProduct[]>([])
  const { isError, isFetching, data } = useGetProductByIdQuery(id as string)
  const { data: productData } = useGetProductsQuery()
  const [commentData, setCommentData] = useState<any[]>([])
  const [idCategory, setIdCategory] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [rating, setRating] = useState<any>() // Giá trị mặc định cho rating là 5

  console.log('selectedProductId', selectedProductId)

  const [commentContent, setCommentContent] = useState<string>('')
  const [commentImage, setCommentImage] = useState<string>('')

  const productt = commentData.filter((items: any) => items.productId == id)

  console.log('commentData', commentData)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/comments')
      setCommentData(response.data)
    }
    fetchData()
  }, [commentData])

  console.log('user.user.fullname', user)

  // hàm để call api Comment
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // lấy dữ liệu từ user nhập vào
      const requestData = {
        content: commentContent,
        rating: rating,
        image: commentImage || '',
        fullname: user.user.fullname || '',
        userId: user.user._id || '',
        productId: id
      }

      // Gọi API sử dụng axios
      const response = await axios.post('http://localhost:8080/api/comments', requestData)
      alert('Đã Thêm Bình Luận')
      console.log('Comment added successfully:', response.data)

      // Có thể cập nhật trạng thái commentData hoặc fetch lại comments ở đây nếu cần
    } catch (error) {
      console.error('Error adding comment:', error)
      // Xử lý lỗi thêm comment ở đây, ví dụ như cập nhật state để hiển thị lỗi
    }
  }

  useEffect(() => {
    if (productList.length > 0) {
      setSelectedProductId(productList[0]._id) // Chọn sản phẩm đầu tiên mặc định
    }
  }, [productList]) // Sẽ chạy lại khi productList thay đổi

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
              style={{ width: '500px', margin: 'auto' }}
              className='object-cover'
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
          <h2 className='mb-4 text-3xl font-semibold'> Sản phẩm liên quan </h2>

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

          {/* Comment */}
          <div>
            <h3 className='mb-4 text-2xl font-semibold px-[80px] py-[20px]'> Comment </h3>
            <div>
              {productt.map((itm: any) => {
                return (
                  <>
                    <div className='flex gap-3 m-[30px]'>
                      <img className='w-8 h-8' src='https://cdn-icons-png.flaticon.com/128/560/560277.png' alt='' />

                      <div
                        style={{ background: 'rgb(224 224 224)', padding: '10px', borderRadius: '10px' }}
                        className='items-center'
                      >
                        <h1>{itm.fullname}</h1>
                        <h1>{itm.content}</h1>
                        <div className='flex' style={{ alignItems: 'center', gap: '5px' }}>
                          <h1>Đánh Giá: {itm.rating} </h1>
                          <img
                            style={{ width: '15px', height: '15px' }}
                            src='https://cdn-icons-png.flaticon.com/128/1828/1828884.png'
                            alt=''
                          />
                        </div>
                        {itm.image ? (
                          <div>
                            <img
                              style={{ borderRadius: '20px' }}
                              className='w-[250px] mt-[10px] '
                              src={itm.image}
                              alt=''
                            />
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </>
                )
              })}
            </div>

            <div>
              <form onSubmit={handleSubmit} className='max-w-sm p-6 bg-white shadow-md rounded-md'>
                <div className='mb-4'>
                  <label htmlFor='comment' className='block text-sm font-medium text-gray-700'>
                    Nhập bình luận
                  </label>
                  <input
                    id='comment'
                    type='text'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Nhập bình luận'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                    Chọn hình ảnh (nếu có)
                  </label>
                  <input
                    id='comment'
                    type='text'
                    value={commentImage}
                    onChange={(e) => setCommentImage(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Nhập bình luận'
                  />
                </div>

                <div className='mb-4'>
                  <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
                    Đánh Giá
                  </label>
                  <input
                    id='comment'
                    type='Number'
                    value={rating}
                    min='1'
                    max='5'
                    onChange={(e) => setRating(e.target.value)}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Nhập bình luận'
                    required
                  />
                </div>
                <button
                  type='submit'
                  className='inline-block w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Bình luận
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
