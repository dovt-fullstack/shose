import { useGetContactByIdQuery, useUpdateContactMutation } from '@/api/contact'
import { IContact } from '@/interfaces'
import { Button, Form, Input, Skeleton } from 'antd'
import { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
type FieldType = {
  firstName: string
  email: string
  phone: number
  content: string
}
const ContactEdit = () => {
  const { idContact } = useParams<{ idContact: string }>()
  const { data: contactData, isLoading } = useGetContactByIdQuery(idContact || '')
  const [updateContact] = useUpdateContactMutation()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      firstName: contactData?.data.firstName,
      email: contactData?.data.email,
      phone: contactData?.data.phone,
      content: contactData?.data.content
    })
  }, [contactData])
  const onFinish = (values: IContact) => {
    updateContact({ ...values, _id: idContact || '' })
      .unwrap()
      .then(() => navigate('/admin/contact'))
  }
  return (
    <div>
      <header className='mb-4'>
        <h2 className='font-bold text-2xl'>Sửa liên hệ</h2>
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
            <Button htmlType='submit' className='mx-4'>
              {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Sửa'}
            </Button>
            <Button className='ml-2 text-blue-500' onClick={() => navigate('/admin/contact')}>
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default ContactEdit
