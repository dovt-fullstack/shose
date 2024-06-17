import { useAddCategoryMutation } from '@/api/category'
import { ICategory } from '@/interfaces/category'
import LoadingOutlined from '@ant-design/icons'
import { Button, Form, Input, Upload } from 'antd'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FieldType = {
  name: string
  desciption: string
  image: File
}
const CategoryAdd = () => {
  const [addCategory, { isLoading }] = useAddCategoryMutation()
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<RcFile[]>([])

  const onFinish = async (values: ICategory) => {
    const fileUrls = await SubmitImage()
    values.image = fileUrls

    await addCategory(values)
      .unwrap()
      .then(() => navigate('/admin/category'))
      .catch((error) => {
        console.error('Lỗi thêm danh mục:', error)
      })
  }
  const onFileChange = ({ fileList }: any) => {
    setFileList(fileList)
  }
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

  return (
    <div>
      <header className='mb-4'>
        <h2 className='font-bold text-2xl'>Thêm danh mục</h2>
      </header>
      <Form
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
            { required: true, message: 'Vui lòng nhập tên danh mục !' },
            { min: 3, message: 'Sản phẩm ít nhất 3 ký tự' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Mô tả'
          name='desciption'
          rules={[
            { required: true, message: 'Vui lòng nhập mô tả !' },
            { min: 10, message: 'Sản phẩm ít nhất 10 ký tự' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Ảnh'
          name='image'
          rules={[{ required: true, message: 'Vui lòng chọn ảnh !' }]}
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
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' disabled={isLoading} danger>
            {isLoading ? <LoadingOutlined className='animate-spin' /> : 'Thêm'}
          </Button>
          <Button type='primary' danger className='ml-2' onClick={() => navigate('/admin/category')}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CategoryAdd
