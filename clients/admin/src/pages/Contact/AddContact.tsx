import { useAddContactMutation } from '@/api/contact'
import { IContact } from '@/interfaces'
import LoadingOutlined from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

type FieldType = {
  firstName: string
  email: string
  phone: number
  content: string
}
const ContactAdd = () => {
  const [addContact, { isLoading }] = useAddContactMutation()
  const navigate = useNavigate()
  const onFinish = async (values: IContact) => {
    await addContact(values)
      .unwrap()
      .then(() => navigate('/admin/contact'))
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div>
      <header className='mb-4'>
        <h2 className='font-bold text-2xl'>Thêm liên hệ</h2>
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
          label='Tên'
          name='firstName'
          rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Vui lòng nhập email !' },
            { type: 'email', message: 'email không đúng định dạng' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Số điện thoại'
          name='phone'
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại !' },
            { min: 10, message: 'Sản phẩm ít nhất 10 ký tự' }
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Nội dung'
          name='content'
          rules={[{ required: true, message: 'Vui lòng nhập nội dung !' }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' danger htmlType='submit'>
            {isLoading ? <LoadingOutlined className='animate-spin' /> : 'Thêm'}
          </Button>
          <Button type='primary' danger className='ml-2' onClick={() => navigate('/admin/contact')}>
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ContactAdd
