import { useGetCategorysQuery, useRemoveCategoryMutation } from '@/api/category'
import TitlePage from '@/components/TitlePage/TitlePage'
import { pathRouter } from '@/constants/pathRouter'
import { ICategory } from '@/interfaces/category'

import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const AdminCategoryList = () => {
  const { data: categorytData, error, isLoading } = useGetCategorysQuery()
  const [removeCategory, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveCategoryMutation()

  const confirm = (id: string) => {
    removeCategory(id)
  }
  const dataSource = categorytData?.data.map(({ _id, name, desciption, image }: ICategory) => ({
    key: _id || '',
    name,
    desciption,
    image
  }))

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Mô tả',
      dataIndex: 'desciption',
      key: 'desciption'
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (images: string) => <img className='image' src={images[0]} alt='image of product' width={100} />
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: _id }: { key: string }) => {
        return (
          <>
            <div className='space-x-2'>
              <Link to={`/${pathRouter.admin}/${pathRouter.categoryList}/edit/${_id}`}>
                <Button type='primary' className='bg-blue-600'>
                  <AiTwotoneEdit />
                </Button>
              </Link>
              <Popconfirm title='Bạn có muốn xóa' onConfirm={() => confirm(_id)} okText='Yes' cancelText='No'>
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
      <header className='mb-4 flex justify-between items-center'>
        <TitlePage title='Quản lý danh mục' />
        <Button type='primary' danger>
          <Link to={`/${pathRouter.admin}/${pathRouter.categoryAdd}`}>Thêm danh mục</Link>
        </Button>
      </header>

      {isRemoveSuccess && <Alert message='Xóa thành công' type='success' />}
      {isLoading || isRemoveLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource?.reverse() || []} columns={columns} />
      )}
    </div>
  )
}

export default AdminCategoryList
