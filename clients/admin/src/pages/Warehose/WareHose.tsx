import { useDeleteWareHouseMutation, useGetallWareHousesQuery } from '@/api/warehouse'
import TitlePage from '@/components/TitlePage/TitlePage'
import { Button, Modal, Popconfirm, Table, notification } from 'antd'
import { useEffect, useState } from 'react'
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import { IWareHose } from '@/interfaces'
import AddWare from './Add'

export default function WareHose() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [dataEdit, setDataEdit] = useState<IWareHose>()
  const { data: warehouseList } = useGetallWareHousesQuery()
  const [deleteWareHouse, wareHouseRes] = useDeleteWareHouseMutation()

  useEffect(() => {
    setIsModalVisible(isModalVisible)
  }, [])

  useEffect(() => {
    if (wareHouseRes.error) {
      notification.error({
        message: 'Error',
        description: (wareHouseRes.error as any).data.message
      })
    }
  }, [wareHouseRes.error])

  const handleDelete = async (id: string) => {
    try {
      deleteWareHouse(id).then(({ data }: any) => {
        if (data.data) {
          notification.success({
            message: 'Success',
            description: 'Xóa kho thành công'
          })
        }
      })
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Xóa kho không thành công'
      })
    }
  }
  const dataSource = warehouseList?.map((product) => ({
    key: product._id,
    name: product.name,
    allInventory: product.allInventory,
    address: product.address,
    status: product.status,
    totalSoldOuts: product.totalSoldOuts,
    phoneNumber: product.phoneNumber
  }))

  const columns = [
    {
      title: 'Tên kho',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'SL Tồn',
      dataIndex: 'allInventory',
      key: 'allInventory'
    },
    {
      title: 'SL Đã bán',
      dataIndex: 'totalSoldOuts',
      key: 'totalSoldOuts'
    },

    {
      title: 'Số ĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status'
    },

    {
      title: 'Action',
      key: 'action',
      render: ({ key: _id }: { key: string }) => {
        return (
          <>
            <div className='space-x-2'>
              <Button
                type='primary'
                className='bg-blue-600'
                onClick={() => {
                  setIsModalVisible(true)
                  warehouseList && setDataEdit(warehouseList?.find((data) => data._id === _id))
                }}
              >
                <AiTwotoneEdit />
              </Button>

              <Popconfirm title='Bạn có muốn xóa' onConfirm={() => handleDelete(_id)} okText='Yes' cancelText='No'>
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
    <>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý kho hàng' />
        <Button
          type='default'
          className='text-base flex items-center bg-[#2eb236] text-white font-semibold'
          onClick={() => {
            setIsModalVisible(true), setDataEdit(undefined)
          }}
        >
          Thêm Kho hàng
        </Button>
      </header>
      <Table bordered dataSource={dataSource} columns={columns} />
      <Modal
        destroyOnClose
        title={dataEdit ? 'Sửa kho hàng' : 'Thêm kho hàng'}
        open={isModalVisible}
        width='50%'
        footer={false}
        onCancel={() => setIsModalVisible(false)}
      >
        <AddWare dataSource={dataEdit ?? dataEdit} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </>
  )
}
