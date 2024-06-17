import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from '@/api/category'
import { ICategory } from '@/interfaces/category'
import { Button, Form, Input, Skeleton, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'

type FieldType = {
  name: string
  desciption: string
  image: File
}

const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { data: categorytData, isLoading } = useGetCategoryByIdQuery(id || '')
  const [updateCategory] = useUpdateCategoryMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [fileList, setFileList] = useState<RcFile[]>([])

  useEffect(() => {
    form.setFieldsValue({
      name: categorytData?.data.name,
      desciption: categorytData?.data.desciption,
      image: categorytData?.data.image
    })
  }, [categorytData])

  const SubmitImage = async () => {
    const uploadPromises = fileList.map(async (file) => {
      const data = new FormData()
      const cloud_name = 'drquzvhxt'
      const upload_preset = 'datn-upload'
      data.append('file', file.originFileObj)
      data.append('upload_preset', upload_preset)
      data.append('cloud_name', cloud_name)
      data.append('folder', 'datn')

      const takeData = await axios
        .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
        .then((data) => data)

      return takeData.data.secure_url
    })

    return Promise.all(uploadPromises)
  }

  const onFileChange = ({ fileList }: any) => {
    setFileList(fileList)
  }

  const onFinish = async (values: ICategory) => {
    const fileUrls = await SubmitImage()
    values.image = fileUrls
    updateCategory({ ...values, _id: id })
      .unwrap()
      .then(() => navigate('/admin/category'))
  }

  return (
    <div>
      <header className='mb-4'>
        <h2 className='font-bold text-2xl'>Sửa danh mục {categorytData?.data?.name}</h2>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tên danh mục'
            name='name'
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục!' },
              { min: 3, message: 'Danh mục ít nhất 3 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Mô tả'
            name='desciption'
            rules={[
              { required: true, message: 'Vui lòng nhập tên danh mục!' },
              { min: 10, message: 'Danh mục ít nhất 10 ký tự' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Ảnh'
            name='image'
            rules={[{ required: true, message: 'Vui lòng chọn !' }]}
            hasFeedback
          >
            <Upload
              customRequest={() => {}}
              onChange={onFileChange}
              fileList={fileList}
              listType='picture'
              beforeUpload={() => false}
            >
              <Button>Chọn ảnh</Button>
            </Upload>
            {categorytData?.data?.image && !fileList.length && (
              <div className='w-24 mt-4'>
                <img src={categorytData.data.image[0]} alt='' />
              </div>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType='submit' className='mx-4'>
              {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Sửa'}
            </Button>
            <Button className='ml-2 text-blue-500' onClick={() => navigate('/admin/category')}>
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default CategoryEdit
