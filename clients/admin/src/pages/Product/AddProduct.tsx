import { useGetCategorysQuery } from '@/api/category'
import { useAddProductMutation } from '@/api/product'
import { useGetallWareHousesQuery } from '@/api/warehouse'
import UpLoand from '@/components/ImagePreview/UploadImageTintuc'
import { IWareHose } from '@/interfaces'
import { ICategory } from '@/interfaces/category'
import { IProduct } from '@/interfaces/product'
import { Button, Col, ColorPicker, Form, Input, InputNumber, Select, Space, notification } from 'antd'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaMinus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

type Props = {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
}
const AddProduct = ({ setIsModalVisible }: Props) => {
  const navigate = useNavigate()
  const [addproduct, addproductRes] = useAddProductMutation()

  
  const { data: category } = useGetCategorysQuery()
  const { data: wareHouseList } = useGetallWareHousesQuery()
  const [newWarehouse,setNew]=useState([])
  const [img, setImg] = useState<string[]>([])
  useEffect(()=>{
  const fetchData = async()=>{
  const {data} = await axios.get('http://localhost:8080/api/warehose')
  console.log(data,'day')
  }
  fetchData()
  },[])
  const { TextArea } = Input
  const [form] = Form.useForm()



  useEffect(() => {
    if (addproductRes.isSuccess) {
      navigate('/admin/product')
      notification.success({
        message: 'Success',
        description: 'Thêm sản phẩm thành công'

      })
      alert("thêm thành công ")
    }
  }, [addproductRes.isSuccess, navigate])

  const handleImage = (url: string) => {
    setImg([...img, url])
  }

  const handleImageRemove = (url: string) => {
    setImg((prevImg) => prevImg.filter((imageUrl: string) => imageUrl !== url))
  }



  // hàm để thêm sản phẩm 
  const onFinish = async (products: IProduct) => {
    const product = {
      name: products.name,
      price: products.price,
      image: img,
      warehouseId: products.warehouseId,
      description: products.description,
      hot_sale: '123',
      categoryId: products.categoryId,
      listQuantityRemain: products.listQuantityRemain.map((item: any) => ({
        colorHex:
          (!!item.colorHex && item.colorHex === undefined) || item.colorHex === ''
            ? item.colorHex.toHexString()
            : '#ffffff',
        nameColor: item.nameColor,
        nameSize: item.nameSize,
        quantity: item.quantity
      }))
    }

    // return; ra 
    await addproduct(product as any)
    setIsModalVisible(false)

    form.resetFields()
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
          {/* <Form.Item
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
          </Form.Item> */}

          <Form.Item
            label='Giá Sản Phẩm'
            name='price'
            dependencies={['hot_sale']}
            rules={[
              { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
              {
                validator: (_, value) =>
                  !value || !isNaN(Number(value)) ? Promise.resolve() : Promise.reject('Giá phải là một số')
              },

            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label='Category'
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
              <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column', marginLeft:"80px" }}>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    className='space'
                    key={key}
                    style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}
                    align='baseline'
                  >
                    {/* <Form.Item className='colorFormItem' {...restField} name={[name, 'colorHex']}>
                      <ColorPicker defaultValue={'fff'} showText={(color) => color.toHexString()} format='hex' />
                    </Form.Item> */}
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
                    <FaMinus
                      className='mb-5'
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType='submit'>Thêm sản phẩm mới</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProduct
