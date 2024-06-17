import { useGetContactsQuery, useRemoveContactMutation } from '@/api/contact'
import TitlePage from '@/components/TitlePage/TitlePage'
import { IContact } from '@/interfaces'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd'
import { Link } from 'react-router-dom'
import { pathRouter } from '@/constants/pathRouter'

export default function Contact() {
  const { data: contactData, isLoading } = useGetContactsQuery()
  const [removeContact, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveContactMutation()

  const confirm = (id: string) => {
    removeContact(id)
  }
  const dataSource = contactData?.data?.map((contact: IContact) => ({
    key: contact._id,
    firstName: contact.firstName,
    email: contact.email,
    phone: contact.phone,
    content: contact.content
  }))

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: _id }: { key: string }) => {
        return (
          <div className='space-x-2'>
            <Button type='primary' className='bg-blue-600'>
              <Link to={`/admin/contact/update/${_id}`}>
                <AiTwotoneEdit />
              </Link>
            </Button>
            <Popconfirm title='Bạn có muốn xóa' onConfirm={() => confirm(_id)} okText='Yes' cancelText='No'>
              <Button type='primary' danger className='bg-red-600'>
                <AiTwotoneDelete />
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý thông tin liên lạc' />
        <Button type='primary' danger>
          <Link to={`/${pathRouter.admin}/${pathRouter.contactAdd}`}>Thêm liên hệ</Link>
        </Button>
      </header>
      {isRemoveSuccess && <Alert message='Xóa thành công' type='success' />}
      {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
  )
}
