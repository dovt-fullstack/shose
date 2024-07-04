import { Pagination, ProductBanner, ShopSideNav } from '.';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components';
import { IProduct } from '@/types';
import { useGetProductsQuery } from '@/store';

const ShopPage = () => {
  const { data: productData } = useGetProductsQuery();
  const [products, setProducts] = useState<IProduct[]>(productData?.products || []);

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ priceStart: number, priceLow: number }>({
    priceStart: 0,
    priceLow: Number.MAX_SAFE_INTEGER // Sử dụng giá trị lớn nhất có thể để đảm bảo không có sản phẩm nào bị lọc ra vì giá
  });

  useEffect(() => {
    if (productData) {
      setProducts(productData.products);
    }
  }, [productData]);

  if (!productData) return <></>;

  // Xử lý khi thay đổi bộ lọc thể loại sản phẩm
  const handleFilterCategory = (categoryId: string) => {
    console.log("products",categoryId)

    setSelectedCategory(categoryId);
    filterProducts(categoryId, selectedPriceRange);
  };

  // Xử lý khi thay đổi bộ lọc giá
  const handleFilterPrice = (priceStart: number, priceLow: number) => {
    setSelectedPriceRange({ priceStart, priceLow });
    filterProducts(selectedCategory, { priceStart, priceLow });
  };

  // Hàm lọc sản phẩm dựa trên các bộ lọc hiện tại
  const filterProducts = (categoryId: string | undefined, priceRange: { priceStart: number, priceLow: number }) => {
    const { products } = productData;

    let filteredProducts = products;

    if (categoryId) {
      filteredProducts = filteredProducts.filter(product => product.categoryId === categoryId);
    }

    filteredProducts = filteredProducts.filter(product => product.price >= priceRange.priceStart && product.price <= priceRange.priceLow);

    setProducts(filteredProducts);
  };

  // Callback để cập nhật số sản phẩm trên mỗi trang từ ProductBanner
  const itemsPerPageFromBanner = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

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
  );
};

export default ShopPage;
