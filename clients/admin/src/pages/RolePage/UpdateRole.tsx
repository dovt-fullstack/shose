import { useUpdateRoleMutation, useGetRoleByIdQuery } from '@/api/role'
import TitlePage from '@/components/TitlePage/TitlePage'
import { Button, Form, Input, Spin, notification } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type FieldType = {
  role_name: string
  description: string
  // trang_thai: string;
}
const UpdateRole = () => {
  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()
  const [updateRoles] = useUpdateRoleMutation()
  const { data, isLoading, refetch } = useGetRoleByIdQuery(id || '')
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: data?.role_name,
      description: data?.description
    })
  }, [data, form])

  const onFinish = async (values: any) => {
    try {
      const updateRole = await updateRoles({ ...values, _id: id }).unwrap()
      navigate('/admin/role')
      notification.success({
        message: 'Cập nhật thành công',
        description: `The Role ${updateRole.role_name} has been updated.`,
        duration: 2
      })
      refetch()
    } catch (error) {
      // console.error('Error updating Role:', error)
      notification.error({
        message: 'Cập nhập thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật Vai trò.',
        duration: 2
      })
    }
  }

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    )
  }
  return (
    <div>
      <header className='mb-4'>
        <TitlePage title='Sửa vai trò' />
      </header>
      <div>
        <Form
          form={form}
          initialValues={data}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500, margin: '0 auto' }}
          onFinish={onFinish}
        >
          <Form.Item
            label='Tên vai trò'
            name='role_name'
            rules={[
              { required: true, message: 'Please input your Name!' },
              { min: 1, message: 'Name must be at least 1 characters.' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Mô tả' name='description'>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType='submit'>Update Customer</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UpdateRole
