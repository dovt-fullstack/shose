import { Pagination, ProductBanner, ShopSideNav } from '.'
import { useEffect, useState } from 'react'
import { Breadcrumbs } from '@/components'
import { IProduct } from '@/types'
import { useGetProductsQuery } from '@/store'
import { useSelector } from 'react-redux'

const ShopPage = () => {
  const { data: productData } = useGetProductsQuery()
  const productDemo = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '1'
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '2'
    },
    {
      _id: '3',
      name: 'Product 3',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '3'
    },
    {
      _id: '4',
      name: 'Product 4',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '4'
    },
    {
      _id: '5',
      name: 'Product 5',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '5'
    },
    {
      _id: '6',
      name: 'Product 6',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '1'
    },
    {
      _id: '7',
      name: 'Product 7',
      description: 'Product description',
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '2'
    }
  ]

  const [originalProducts, setOriginalProducts] = useState<any[]>(productData?.products || productDemo)
  const [products, setProducts] = useState<any[]>(productData?.products || productDemo)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const selectonfg = useSelector((state: any) => state.category.category)
  console.log('selectonfg', selectonfg)
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ priceStart: number; priceLow: number }>({
    priceStart: 0,
    priceLow: Number.MAX_SAFE_INTEGER // Sử dụng giá trị lớn nhất có thể để đảm bảo không có sản phẩm nào bị lọc ra vì giá
  })

  // Cập nhật products từ productData khi productData thay đổi
  useEffect(() => {
    if (productData) {
      setOriginalProducts(productData.products)
      setProducts(productData.products)
    }
  }, [productData])

  // Xử lý khi thay đổi bộ lọc thể loại sản phẩm
  const handleFilterCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterProducts(categoryId, selectedPriceRange)
  }

  // Xử lý khi thay đổi bộ lọc giá
  const handleFilterPrice = (priceStart: number, priceLow: number) => {
    setSelectedPriceRange({ priceStart, priceLow })
    filterProducts(selectedCategory, { priceStart, priceLow })
  }

  // Hàm lọc sản phẩm dựa trên các bộ lọc hiện tại
  const filterProducts = (categoryId: string | undefined, priceRange: { priceStart: number; priceLow: number }) => {
    console.log("guy")
    let filteredProducts = originalProducts

    if (categoryId) {
      filteredProducts = filteredProducts.filter((product) => product.categoryId === categoryId)
    }

    // Uncomment and modify this if you have price filtering
    // filteredProducts = filteredProducts.filter(
    //   (product) => product.price >= priceRange.priceStart && product.price <= priceRange.priceLow
    // )

    setProducts(filteredProducts)
  }

  useEffect(() => {
    filterProducts(selectonfg, selectedPriceRange)
  }, [selectonfg])

  // Callback để cập nhật số sản phẩm trên mỗi trang từ ProductBanner
  const itemsPerPageFromBanner = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage)
  }

  return (
    <div className='px-4 mx-auto max-w-container'>
      <Breadcrumbs title='Products' />

      <div className='flex w-full h-full gap-10 pb-20'>
        <div className='w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full'>
          <ShopSideNav onFilterCategory={handleFilterCategory} onFilterPrice={handleFilterPrice} />
        </div>
        <div className='w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10'>
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} products={products} />
        </div>
      </div>
    </div>
  )
}

export default ShopPage
