import LoadingOutlined from '@ant-design/icons'
import { useGetRoleQuery } from '@/api/role'
import { useGetUserByIdQuery, useUpdateUserRoleMutation } from '@/api/user'
import { IUser } from '@/interfaces/user'
import { Select, Modal, Skeleton, Form, Button } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select
const { confirm } = Modal
const AdminEditUser = () => {
  const { id } = useParams<{ id: string }>()
  const { data: userData, isLoading } = useGetUserByIdQuery(id || '')
  const [updateUser] = useUpdateUserRoleMutation()
  const { data: roleData } = useGetRoleQuery()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    form.setFieldsValue({
      role_name: userData?.user?.role.role_name
    })
  }, [userData, form])

  const onFinish = (values: IUser) => {
    const updatedUser = {
      ...values,
      _id: id
    }

    updateUser(updatedUser)
      .unwrap()
      .then(() => {
        navigate('/admin/user')
        confirm({
          title: 'Sửa vai trò thành công',
          content: 'Vai trò đã được cập nhật thành công.',
          okText: 'Ok',
          onOk: () => {}
        })
      })
  }

  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div>
      <header className='mb-4'>
        <h2 className='font-bold text-2xl'>Sửa User: {userData?.user.name}</h2> <p>Email: {userData?.user.email}</p>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          name='basic'
          initialValues={userData?.user} // Thay đổi ở đây
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item label='Vai trò' name='role_name'>
            <Select>
              {roleData?.map((role) => (
                <Option key={role._id} value={role.role_name}>
                  {role.role_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' danger htmlType='submit'>
              {isLoading ? <LoadingOutlined className='animate-spin' /> : 'Sửa'}
            </Button>
            <Button type='primary' danger className='ml-2' onClick={() => navigate('/admin/user')}>
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}

      <Modal
        title='Sửa vai trò'
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='save' type='primary' onClick={handleCancel}>
            Lưu
          </Button>
        ]}
      >
        <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete='off'>
          <Form.Item label='Vai trò' name='role_name'>
            <Select value={form.getFieldValue('role')}>
              {roleData?.map((role) => (
                <Option key={role._id} value={role.role_name}>
                  {role.role_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminEditUser
