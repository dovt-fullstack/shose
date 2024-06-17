import { useGetUserQuery, useRemoveUserMutation } from '@/api/user'
import TitlePage from '@/components/TitlePage/TitlePage'
import { pathRouter } from '@/constants/pathRouter'
import { IUser } from '@/interfaces/user'
import { Alert, Button, Popconfirm, Skeleton, Table, Tabs } from 'antd'
import moment from 'moment'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'

interface Props {
  userData: IUser[]
  isLoading: boolean
  confirm: (id: string) => void
}

const LayoutComponent = ({ isLoading, userData, confirm }: Props) => {
  const dataSource = userData?.map((user: IUser) => ({
    key: user._id,
    name: user.name,
    fullname: user.fullname,
    ngaysinh: user.ngaysinh,
    email: user.email,
    password: user.password,
    role: user.role.role_name,
    trang_thai: user.trang_thai
  }))

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaysinh',
      key: 'ngaysinh',
      render: (data: string) => <span>{data ? moment(data).format('DD-MM-YYYY') : ''}</span>
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      key: 'trang_thai'
    },
    {
      title: 'Action',
      key: 'action',
      render: (data: any) => (
        <>
          <div className='space-x-2'>
            <Link to={`/${pathRouter.admin}/${pathRouter.userList}/edit/${data?.key}`}>
              <Button type='primary' className='bg-blue-600'>
                <AiTwotoneEdit />
              </Button>
            </Link>
            <Popconfirm
              title='Bạn có muốn xóa'
              onConfirm={() => {
                if (data.role !== 'admin') {
                  confirm(data.key)
                }
              }}
              okText='Yes'
              cancelText='No'
            >
              <Button type='primary' danger className='bg-red-600' disabled={data.role === 'admin'}>
                <AiTwotoneDelete />
              </Button>
            </Popconfirm>
          </div>
        </>
      )
    }
  ]
  return <>{isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}</>
}

const AdminUser = () => {
  const { data: userData, isLoading } = useGetUserQuery()
  const [removeUser, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveUserMutation()

  const handleFillterUser = (role: string) => {
    return userData?.users.filter((item) => item.role?.role_name === role) || []
  }

  const confirm = (id: number | string) => {
    removeUser(id)
  }
  const items = [
    {
      key: '1',
      label: 'Tất cả khách hàng',
      children: (
        <LayoutComponent
          userData={handleFillterUser('user')}
          confirm={confirm}
          isLoading={isLoading || isRemoveLoading}
        />
      )
    },
    {
      key: '2',
      label: 'Tất cả nhân viên',
      children: (
        <LayoutComponent
          userData={handleFillterUser('quản lý')}
          confirm={confirm}
          isLoading={isLoading || isRemoveLoading}
        />
      )
    },
    {
      key: '3',
      label: 'Admin',
      children: (
        <LayoutComponent
          userData={handleFillterUser('admin')}
          confirm={confirm}
          isLoading={isLoading || isRemoveLoading}
        />
      )
    }
  ]

  return (
    <div>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý người dùng' />
        <Button type='primary' danger>
          <Link to={`/${pathRouter.admin}/${pathRouter.userAdd}`}>Thêm người dùng</Link>
        </Button>
      </header>
      <div>
        <Tabs defaultActiveKey='1' items={items} className='text-white' />
        {isRemoveSuccess && <Alert message='Success Text' type='success' />}
      </div>
    </div>
  )
}

export default AdminUser
