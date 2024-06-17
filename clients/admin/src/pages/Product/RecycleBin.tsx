import { DeleteTwoTone, SyncOutlined } from '@ant-design/icons'
import { Button, Spin, Table, notification } from 'antd'
import { useGetDeletedProductsQuery, usePermanentDeleteProductMutation, useRestoreProductMutation } from '@/api/product'
import TitlePage from '@/components/TitlePage/TitlePage'
import { IProduct } from '@/interfaces/product'

const RecycleBin = () => {
  const { data: deletedProducts, isLoading, refetch } = useGetDeletedProductsQuery()
  const [restoreProduct, { isLoading: isRestoring }] = useRestoreProductMutation()
  const [permanentDeleteProduct, { isLoading: isDeleting }] = usePermanentDeleteProductMutation()

  const handleRestore = async (id: string) => {
    try {
      await restoreProduct(id).unwrap()
      notification.success({
        message: 'Success',
        description: 'Product restored successfully!'
      })
      refetch()
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to restore product'
      })
    }
  }

  const dataSource = deletedProducts?.products?.map((product: IProduct) => ({
    key: product._id,
    name: product.name,
    image: product.image,
    price: product.price,
    description: product.description
  }))
  const handlePermanentDelete = async (id: string) => {
    try {
      await permanentDeleteProduct(id).unwrap()
      notification.success({
        message: 'Success',
        description: 'Product permanently deleted!'
      })
      refetch()
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to permanently delete product'
      })
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: any[]) => {
        return image.map((item, i) => {
          return <img key={i} src={item.image} alt='' width={100} />
        })
      }
    },

    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: id }: { key: number | string }) => (
        <>
          <Button onClick={() => handleRestore(id.toString())} disabled={isRestoring}>
            <SyncOutlined spin style={{ fontSize: '26px', color: '#08c' }} />
          </Button>
          <Button onClick={() => handlePermanentDelete(id.toString())} disabled={isDeleting}>
            <DeleteTwoTone style={{ fontSize: '26px', color: 'red' }} />
          </Button>
        </>
      )
    }
  ]

  if (isLoading) return <Spin />
  return (
    <div>
      <header className='mb-4'>
        <TitlePage title='Thùng rác Sản phẩm' />
      </header>
      <Table dataSource={dataSource || []} columns={columns} />
    </div>
  )
}

export default RecycleBin
