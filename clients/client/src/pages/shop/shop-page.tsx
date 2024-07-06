import { Pagination, ProductBanner, ShopSideNav } from '.'
import { useEffect, useState } from 'react'
import { Breadcrumbs } from '@/components'
import { useGetProductsQuery } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearCategory } from '@/store/slices/CategorySilie'

const ShopPage = () => {
  const { data: productData } = useGetProductsQuery()
  const productDemo = [
    {
      _id: '1',
      name: 'Product 1',
      description: 'Product description',
      price: 100,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '1'
    },
    {
      _id: '2',
      name: 'Product 2',
      description: 'Product description',
      price: 200,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '2'
    },
    {
      _id: '3',
      name: 'Product 3',
      description: 'Product description',
      price: 300,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '3'
    },
    {
      _id: '4',
      name: 'Product 4',
      description: 'Product description',
      price: 400,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '4'
    },
    {
      _id: '5',
      name: 'Product 5',
      description: 'Product description',
      price: 500,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '5'
    },
    {
      _id: '6',
      name: 'Product 6',
      description: 'Product description',
      price: 600,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '1'
    },
    {
      _id: '7',
      name: 'Product 7',
      description: 'Product description',
      price: 700,
      image: [
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp'
      ],
      categoryId: '2'
    }
  ]

  const dispatch = useDispatch();

  const [originalProducts, setOriginalProducts] = useState<any[]>(productData?.products || productDemo)
  const [products, setProducts] = useState<any[]>(productData?.products || productDemo)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const selectonfg = useSelector((state: any) => state.category.category)
  console.log('selectonfg', selectonfg)

  const [selectedPriceRange, setSelectedPriceRange] = useState<{ priceStart: number; priceLow: number }>({
    priceStart: 0,
    priceLow: Number.MAX_SAFE_INTEGER
  })

  useEffect(() => {
    if (productData) {
      setOriginalProducts(productData.products)
      setProducts(productData.products)
    }
  }, [productData])

  const handleFilterCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
    filterProducts(categoryId, selectedPriceRange)
  }

  const handleFilterPrice = (priceStart: number, priceLow: number) => {
    setSelectedPriceRange({ priceStart, priceLow })
    filterProducts(selectedCategory, { priceStart, priceLow })
  }

  const filterProducts = (categoryId: string | undefined, priceRange: { priceStart: number; priceLow: number }) => {
    let filteredProducts = originalProducts

    if (categoryId) {
      filteredProducts = filteredProducts.filter((product) => product.categoryId === categoryId)
    }

    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange.priceStart && product.price <= priceRange.priceLow
    )

    setProducts(filteredProducts)
  }

  useEffect(() => {
    filterProducts(selectonfg, selectedPriceRange)
  }, [selectonfg, selectedPriceRange])

  useEffect(() => {
    return () => {
      dispatch(clearCategory());
    };
  }, [dispatch]);

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
