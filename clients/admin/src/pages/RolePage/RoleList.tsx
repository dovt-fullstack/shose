import { useGetRoleQuery, useRemoveRoleMutation } from '@/api/role'
import TitlePage from '@/components/TitlePage/TitlePage'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import { IRole } from '@/interfaces/role'
import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd'
import { Link } from 'react-router-dom'

const RoleList = () => {
  const { data: roleData, error, isLoading } = useGetRoleQuery()
  const [removeRole, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveRoleMutation()

  const confirm = (_id: string) => {
    removeRole(_id)
  }
  const dataSource = roleData?.map((role: IRole) => ({
    key: role._id,
    description: role.description,
    role_name: role.role_name,
    trang_thai: role.trang_thai
  }))

  const columns = [
    {
      title: 'Tên vai trò',
      dataIndex: 'role_name',
      key: 'role_name'
    },
    {
      title: 'Mô tả vai trò',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai'
    },
    {
      render: ({ key: id }: { key: string }) => {
        return (
          <>
            <div className='flex space-x-2'>
              <Button className='bg-blue-600' type='primary'>
                <Link to={`/admin/role/update/${id}`}>
                  <AiTwotoneEdit />
                </Link>
              </Button>
              <Popconfirm title='Bạn muốn xóa không?' onConfirm={() => confirm(id)} okText='Yes' cancelText='No'>
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
        <TitlePage title='Quản lý vai trò' />

        <Button type='primary' danger>
          <Link to='/admin/role/add'> Thêm Vai trò</Link>
        </Button>
      </header>
      {isRemoveSuccess && <Alert message='Success Text' type='success' />}
      {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  )
}
export default RoleList
