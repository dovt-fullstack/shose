import { useGetInformationsQuery, useRemoveInformationMutation } from '@/api/informations'
import TitlePage from '@/components/TitlePage/TitlePage'
import { IInformation } from '@/interfaces'

import FormInfo from '@/components/FormInfo/FormInfo'
import { Alert, Button, Popconfirm, Skeleton, Table } from 'antd'
import { useState } from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

export default function Infomation() {
  const { data: informationData, isLoading } = useGetInformationsQuery()
  const [removeInfor, { isSuccess: isRemoveSuccess }] = useRemoveInformationMutation()
  const [dataEdit, setDataEdit] = useState<IInformation>()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const confirm = (id: any) => {
    removeInfor(id)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setDataEdit(undefined)
  }

  const handleGetDataById = (id: string) => {
    informationData && setDataEdit(informationData.data.find((data) => data._id === id))
    setIsModalVisible(true)
  }
  const dataSource = informationData?.data?.map((information: IInformation) => ({
    key: information._id,
    title: information.title,
    email: information.email,
    phone: information.phone,
    image: information.image,
    logo: information.logo,
    address: information.address,
    nameStore: information.nameStore
  }))

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title'
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
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (images: string) => <img className='image' src={images[0]} alt='image of product' width={90} />
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (url: string) => <img src={url} alt='' style={{ width: 50 }} />
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 250
    },
    {
      title: 'Tên cửa hàng',
      dataIndex: 'nameStore',
      key: 'nameStore'
    },
    {
      title: '',
      render: ({ key: _id }: { key: string }) => {
        return (
          <div className='space-x-2'>
            <Button type='primary' className='bg-blue-600' onClick={() => handleGetDataById(_id)}>
              <AiTwotoneEdit />
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
    <>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý thông tin' />
        <Button
          type='default'
          className='text-base flex items-center bg-[#2eb236] text-white font-semibold'
          onClick={() => setIsModalVisible(true)}
        >
          Thêm thông tin
        </Button>
      </header>
      {isRemoveSuccess && <Alert message='Xóa thành công' type='success' />}
      {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}

      <FormInfo
        isModalOpen={isModalVisible}
        setIsModalOpen={handleCancel}
        mode={!dataEdit ? 'create' : 'edit'}
        defaultValues={dataEdit ?? dataEdit}
      />
    </>
  )
}
