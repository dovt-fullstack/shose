import { useGetAllProductsQuery, useRemoveProductMutation } from '@/api/product'
import TitlePage from '@/components/TitlePage/TitlePage'
import { pathRouter } from '@/constants/pathRouter'
import { IListQuantityRemain, IProduct } from '@/interfaces/product'

import ImagePriview from '@/components/ImagePreview/ImagePreview'
import { Button, Input, Modal, Popconfirm, Spin, Table, notification } from 'antd'
import { useState } from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import AddProduct from './AddProduct'
import { useGetCategorysQuery } from '@/api/category'

const Product = () => {
  const { data: productData, refetch } = useGetAllProductsQuery()
  const { data: cateList } = useGetCategorysQuery()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [softDeleteProduct] = useRemoveProductMutation()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSoftDelete = (id: string) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa sản phẩm này?',
      content: 'Hành động này không thể hoàn tác.',
      onOk: async () => {
        setLoading(true)
        try {
          await softDeleteProduct(id)
          notification.success({
            message: 'Thành công',
            description: 'Sản phẩm đã được xóa mềm thành công!'
          })
          refetch()
        } catch (error) {
          notification.error({
            message: 'Lỗi',
            description: 'Không thể xóa mềm sản phẩm'
          })
        } finally {
          setLoading(false)
        }
      }
    })
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const showModal = () => {
    setIsModalVisible(true)
    refetch()
  }

  const handleOk = () => {
    setIsModalVisible(false)
    refetch()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const dataSource = productData?.products
    ?.filter((product: IProduct) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((product: IProduct) => ({
      key: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      categoryId: product.categoryId,
      listQuantityRemain: product.listQuantityRemain.map((item) => ({
        colorHex: item.colorHex,
        nameColor: item.nameColor,
        nameSize: item.nameSize,
        quantity: item.quantity
      }))
      // inventoryStatus: product.inventoryStatus,
    }))

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: { key: string }) => <Link to={`${record.key}`}>{name}</Link>
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string[]) => {
        return (
          <div className='whitespace-nowrap  text-gray-700 py-4 '>
            <div className='items-center '>
              <div className='text-xs lg:text-base md:text-xl flex '>
                <ImagePriview width={20} listImage={image} />
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (name: string) => cateList?.data.find((item) => item._id === name)?.name
    },
    {
      title: 'colorHex',
      dataIndex: 'listQuantityRemain',
      key: 'listQuantityRemain',
      render: (listQuantityRemain: IListQuantityRemain[]) => {
        return (
          <div className='whitespace-nowrap text-gray-700 py-4'>
            <div className='items-center'>
              <div className='flex flex-col gap-2'>
                {listQuantityRemain.map((item, i) => (
                  <span
                    key={i}
                    className='border border-gray-600 min-h-4 rounded-sm block text-xs lg:text-base md:text-xl'
                    style={{
                      backgroundColor: item.colorHex
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Màu',
      dataIndex: 'listQuantityRemain',
      key: 'listQuantityRemain',
      render: (listQuantityRemain: IListQuantityRemain[]) => {
        return (
          <div className='whitespace-nowrap text-gray-700 py-4'>
            <div className='items-center'>
              <div className='flex flex-col gap-2'>
                {listQuantityRemain.map((item, i) => (
                  <p key={i + 1} className='text-xs lg:text-base md:text-xl'>
                    {item.nameColor}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'size',
      dataIndex: 'listQuantityRemain',
      key: 'listQuantityRemain',
      render: (listQuantityRemain: IListQuantityRemain[]) => {
        return (
          <div className='whitespace-nowrap text-gray-700 py-4'>
            <div className='items-center'>
              <div className='flex flex-col gap-2'>
                {listQuantityRemain.map((item, i) => (
                  <p key={i + '222'} className='text-xs lg:text-base md:text-xl'>
                    {item.nameSize}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'listQuantityRemain',
      key: 'listQuantityRemain',
      render: (listQuantityRemain: IListQuantityRemain[]) => {
        return (
          <div className='whitespace-nowrap text-gray-700 py-4'>
            <div className='items-center'>
              <div className='flex flex-col gap-2'>
                {listQuantityRemain.map((item, i) => (
                  <p key={i + 'm'} className='text-xs lg:text-base md:text-xl'>
                    {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )
      }
    },

    {
      title: 'Action',
      key: 'action',
      render: ({ key: _id }: { key: string }) => {
        return (
          <>
            <div className='space-x-2'>
              <Link to={`/${pathRouter.admin}/${pathRouter.productList}/update/${_id}`}>
                <Button type='primary' className='bg-blue-600'>
                  <AiTwotoneEdit />
                </Button>
              </Link>
              <Popconfirm
                title='Bạn có muốn xóa'
                onConfirm={() => handleSoftDelete(_id.toString())}
                okText='Yes'
                cancelText='No'
              >
                <Button type='primary' danger className='bg-red-600'>
                  <AiTwotoneDelete />
                </Button>
              </Popconfirm>
            </div>
          </>
        )
      }
    }
  ]

  return (
    <div>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý sản phẩm' />
        <Input.Search placeholder='Search product' onSearch={handleSearch} style={{ width: 600 }} />

        <Button type='default' onClick={showModal}>
          Thêm sản phẩm
        </Button>
        <Modal
          destroyOnClose
          title='Thêm sản phẩm'
          open={isModalVisible}
          onOk={handleOk}
          footer={false}
          onCancel={handleCancel}
          width='40%'
        >
          <AddProduct setIsModalVisible={setIsModalVisible} />
        </Modal>
      </header>
      {loading ? (
        <Spin />
      ) : (
        <Table scroll={{ y: '65vh', x: 1000 }} bordered dataSource={dataSource?.reverse()} columns={columns} />
      )}
    </div>
  )
}

export default Product
