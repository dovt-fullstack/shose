import { useChangePasswordMutation } from '@/api/user'
import { changePasswordSchema } from '@/utils'
import { Button, Form, Input, Modal, message } from 'antd'
import React, { useState } from 'react'

interface ChangePasswordProps {
  handleHideChangePassword: () => void
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ handleHideChangePassword }) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(true)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [changePassword] = useChangePasswordMutation()

  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : {}
  const userId = user._id
  const handlePasswordChange = async () => {
    try {
      const values = await form.validateFields()
      const { error } = changePasswordSchema.validate(values, {
        abortEarly: false
      })
      if (error) {
        const validationErrors: { [key: string]: string } = {}
        error.details.forEach((detail) => {
          const path = detail.path[0] as string
          const message = detail.message
          validationErrors[path] = message
        })
        setErrors(validationErrors)
        return
      }

      const response = await changePassword({ ...values, _id: userId })
      const { data } = response as any

      if (data.errorMessage) {
        if (data.errorMessage === 'Mật khẩu mới và xác nhận mật khẩu không khớp') {
          setErrors({ confirmPassword: 'Mật khẩu xác nhận không trùng khớp' })
        } else {
          message.error(data.errorMessage)
        }
      } else {
        message.success('Đổi mật khẩu thành công')
        form.resetFields()
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        message.error('Mật khẩu cũ không đúng')
      } else {
        message.error('Đổi mật khẩu không thành công, mật khẩu cũ không đúng')
      }
    }
    handleHideChangePassword()
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
    handleHideChangePassword()
  }

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      title={<h3 className='text-center'>Đổi mật khẩu</h3>}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key='change' onClick={handlePasswordChange}>
          Đổi mật khẩu
        </Button>
      ]}
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          name='oldPassword'
          label='Mật khẩu hiện tại'
          validateStatus={errors.oldPassword ? 'error' : ''}
          help={errors.oldPassword}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='newPassword'
          label='Mật khẩu mới'
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          label='Xác nhận mật khẩu'
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePassword
