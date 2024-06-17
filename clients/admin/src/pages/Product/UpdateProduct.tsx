import { css } from '@emotion/react'
import { useGetCategorysQuery } from '@/api/category'
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product'
import { ICategory } from '@/interfaces/category'
import { Button, Col, ColorPicker, Form, Image, Input, InputNumber, Row, Select, Space, Spin, notification } from 'antd'
import { useEffect, useState } from 'react'
import { RxMinusCircled } from 'react-icons/rx'
import { useNavigate, useParams } from 'react-router-dom'

import { useGetallWareHousesQuery } from '@/api/warehouse'
import UpLoand from '@/components/ImagePreview/UploadImageTintuc'
import TitlePage from '@/components/TitlePage/TitlePage'
import { IWareHose } from '@/interfaces'
import { IListQuantityRemain, IProduct } from '@/interfaces/product'

const { Option } = Select
const { TextArea } = Input

const UpdateProduct = () => {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [updateProduct] = useUpdateProductMutation()
  const [currentImage, setCurrentImage] = useState<string[]>([])
  const { data, isLoading } = useGetProductByIdQuery(id || '')
  const { data: wareHouseList } = useGetallWareHousesQuery()
  const { data: category } = useGetCategorysQuery()

  const handleImage = (imageUrl: string) => {
    if (imageUrl) {
      setCurrentImage((e) => [...e, imageUrl])
    }
  }

  const handleImageRemove = (imageUrl: string) => {
    setCurrentImage(currentImage.filter((image) => image !== imageUrl))
  }

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        _id: data?.product._id,
        name: data?.product.name,
        price: data?.product.price,
        image: data?.product.image,
        description: data?.product.description,
        hot_sale: data?.product.hot_sale,
        warehouseId: data?.product.warehouseId,
        categoryId: data?.product.categoryId,
        listQuantityRemain: data?.product.listQuantityRemain.map((item: IListQuantityRemain) => ({
          colorHex: item.colorHex,
          nameColor: item.nameColor,
          nameSize: item.nameSize,
          quantity: item.quantity
        }))
      })
      setCurrentImage(data?.product.image)
    }
  }, [data, form])

  const onFinish = async (values: IProduct) => {
    try {
      await updateProduct({
        ...values,
        _id: id || '',
        image: [...currentImage],
        listQuantityRemain: values.listQuantityRemain.map((item: any) => ({
          colorHex:
            (!!item.colorHex && item.colorHex === undefined) || item.colorHex === ''
              ? item.colorHex.toHexString()
              : '#ffffff',
          nameColor: item.nameColor,
          nameSize: item.nameSize,
          quantity: item.quantity
        }))
      })

      notification.success({
        message: 'Cập nhật thành công',
        description: `The Size ${values.name} has been updated.`,
        duration: 2
      })
      navigate('/admin/product')
    } catch (error) {
      console.error('Error updating product:', error)
      notification.error({
        message: 'Cập nhập thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật sản phẩm',
        duration: 2
      })
    }
  }
  const handleImageDelete = (item: any) => {
    if (currentImage.length == 1) {
      notification.error({
        message: 'Phải có it nhất 1 ảnh cho sản phẩm ',
        description: 'Xóa thất bại',
        duration: 2
      })
      return
    }
    setCurrentImage(currentImage.filter((image) => image !== item))
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <Spin />
      </div>
    )
  }
  return (
    <div>
      <header className='mb-4'>
        <TitlePage title='Cập nhập sản phẩm' />
      </header>
      <div>
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Col span={20}>
            <Form.Item
              label='Name'
              name='name'
              rules={[
                { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                { min: 5, message: 'Tên sản phẩm phải có ít nhất 5 ký tự.' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Giá mới'
              name='price'
              dependencies={['hot_sale']}
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                {
                  validator: (_, value) =>
                    !value || !isNaN(Number(value)) ? Promise.resolve() : Promise.reject('Giá phải là một số')
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('hot_sale') >= value) {
                      return Promise.resolve()
                    }
                    return Promise.reject('Giá mới không được cao hơn giá cũ!')
                  }
                })
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label='Giá cũ'
              name='hot_sale'
              rules={[
                { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                {
                  validator: (_, value) =>
                    !value || !isNaN(Number(value)) ? Promise.resolve() : Promise.reject('Giá phải là một số')
                }
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              label='Danh mục'
              name='categoryId'
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select placeholder='Chọn danh mục'>
                {category?.data?.map((categoryId: ICategory) => (
                  <Option key={categoryId._id} value={categoryId._id}>
                    {categoryId.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* warehouse */}
            <Form.Item
              label='Kho hàng'
              name='warehouseId'
              rules={[{ required: true, message: 'Vui lòng chọn kho hàng!' }]}
            >
              <Select placeholder='Chọn Kho hàng'>
                {wareHouseList?.map((wareHouse: IWareHose) => (
                  <Option key={wareHouse._id} value={wareHouse._id}>
                    {wareHouse.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label='IMG' name='image'>
              <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
              Ảnh cũ :
              <Row gutter={16}>
                {currentImage?.map((item: any) => {
                  return (
                    <Col span={8} key={item}>
                      <Image width={90} src={item} />
                      {/*delete image */}
                      <Button type='primary' danger onClick={() => handleImageDelete(item)}>
                        Xóa
                      </Button>
                    </Col>
                  )
                })}
              </Row>
            </Form.Item>

            <Form.Item
              label='Mô tả'
              name='description'
              rules={[
                { required: true, message: 'Vui lòng nhập mô tả sản phẩm!' },
                { min: 5, message: 'Mô tả sản phẩm phải có ít nhất 5 ký tự.' }
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.List
              name='listQuantityRemain'
              rules={[
                {
                  validator: async (_, names) => {
                    if (names.length < 1) {
                      return Promise.reject(new Error('Ít nhất phải có 1 biến thể'))
                    }
                  }
                }
              ]}
              initialValue={[]}
            >
              {(fields, { add, remove }, { errors }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginLeft: 100 }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      className='space'
                      key={key}
                      style={{ display: 'flex', marginBottom: 8, marginLeft: 300, alignItems: 'center' }}
                      align='baseline'
                    >
                      <Form.Item className='colorFormItem' {...restField} name={[name, 'colorHex']}>
                        <ColorPicker defaultValue={'fff'} showText={(color) => color.toHexString()} format='hex' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'nameColor']}
                        rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}
                      >
                        <Input placeholder='Tên màu' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'nameSize']}
                        rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}
                      >
                        <Input placeholder='Tên size' />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}
                      >
                        <InputNumber placeholder='Số lượng' min={1} />
                      </Form.Item>
                      <RxMinusCircled
                        className='text-xl cursor-pointer ml-1 mb-5'
                        onClick={() => {
                          remove(name)
                        }}
                      />
                    </Space>
                  ))}

                  <Button type='dashed' onClick={() => add()} block>
                    + Thêm biến thể
                  </Button>
                  <Form.ErrorList className='text-red-500' errors={errors} />
                </div>
              )}
            </Form.List>
          </Col>
          <br />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ marginLeft: 200 }}>
            <Button htmlType='submit'>Sửa sản phẩm mới</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProduct
const formcss = css`
  .ant-space-item {
    margin: auto;
  }
  .ant-form-item {
    margin: auto;
  }
  .anticon-close {
    margin-bottom: 8px;
  }
`
