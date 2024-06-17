import { useGetAllProductsQuery } from '@/api/product'
import { useAddWarehouseMutation, useUpdateWarehouseMutation } from '@/api/warehouse'
import { IWareHose } from '@/interfaces'
import { IProduct } from '@/interfaces/product'
import { Button, Col, Form, Input, Select, notification } from 'antd'
import { Dispatch, SetStateAction, useEffect } from 'react'

const { Option } = Select

type Props = {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>

  dataSource?: IWareHose
}
const AddWare = ({ setIsModalVisible, dataSource }: Props) => {
  const [addWareHouse] = useAddWarehouseMutation()
  const [updateWareHouse] = useUpdateWarehouseMutation()
  const { data: productList } = useGetAllProductsQuery()
  const [form] = Form.useForm()
  useEffect(() => {
    if (dataSource) {
      // console.log(dataSource)
      form.setFieldsValue(dataSource)
      // const productList = (dataSource.productId as any)?.map((item: IProduct) => {
      //   return { lable: item._id, value: item.name }
      // })
      form.setFieldValue(
        'productId',
        (dataSource.productId as any)?.map((item: IProduct) => {
          return item._id
        })
      )
    }
  }, [dataSource, form])

  const onFinish = async (products: any) => {
    const product = {
      name: products.name,
      productId: [...products.productId],
      productInventory: [...products.productId],
      address: products.address,
      phoneNumber: products.phoneNumber
    }
    console.log(products, 'Warehouse')

    if (dataSource) {
      updateWareHouse({ ...product, _id: dataSource._id } as any).then(({ data }: any) => {
        if (data) {
          notification.success({
            message: 'Success',
            description: 'Sửa kho thành công'
          })
        } else {
          notification.error({
            message: 'Error',
            description: 'Sửa kho lỗi'
          })
        }
      })
    } else {
      addWareHouse(product as any).then(({ data }: any) => {
        if (data) {
          notification.success({
            message: 'Success',
            description: 'Thêm kho thành công'
          })
        } else {
          notification.error({
            message: 'Error',
            description: 'Thêm kho lỗi'
          })
        }
      })
    }
    setIsModalVisible(false)

    form.resetFields()
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Form
        name='basic'
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Col span={20}>
          <Form.Item
            label='Tên kho'
            name='name'
            rules={[
              { required: true, message: 'Vui lòng nhập tên kho!' },
              { min: 5, message: 'Tên kho phải có ít nhất 5 ký tự.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Địa chỉ'
            name='address'
            rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ!' },
              { min: 5, message: 'Địa chỉ phải có ít nhất 5 ký tự.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Số điện thoại'
            name='phoneNumber'
            rules={[{ required: true, message: 'Vui lòng nhập số ĐT!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Sản phẩm' name='productId' rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}>
            <Select allowClear mode='multiple' placeholder='Chọn sản phẩm'>
              {productList?.products?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <br />

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType='submit'>{dataSource ? 'Sửa' : 'Thêm'} kho</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddWare
