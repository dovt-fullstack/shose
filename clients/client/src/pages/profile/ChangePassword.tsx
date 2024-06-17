import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'

import { useChangePasswordMutation } from '@/store/services/auth.service'
import { changePasswordSchema } from '@/utils'
import { useAppSelector } from '@/store'

const ChangePassword = () => {
  const [form] = Form.useForm()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [changePassword, changePassRes] = useChangePasswordMutation()

  const userString = useAppSelector((state) => state.user)

  const userId = userString?.user?._id

  useEffect(() => {
    if (changePassRes.isError && changePassRes.error) {
      message.error((changePassRes.error as any)?.data?.message)
    }

    if (changePassRes.isSuccess) {
      message.success('Đổi mật khẩu thành công!')
      localStorage.removeItem('user')
      localStorage.clear()
      sessionStorage.clear()
      window.location.href = '/signin'
    }
  }, [changePassRes])

  const handlePasswordChange = async () => {
    try {
      const values = await form.validateFields()
      const { error } = changePasswordSchema.validate(values, {
        abortEarly: false
      })
      if (error) {
        const validationErrors: { [key: string]: string } = {}
        error.details.forEach((detail: any) => {
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
  }

  return (
    <div className='flex-1'>
      <div className='items-center justify-between pb-4'>
        <h2 className='text-[#333] text-lg font-medium'>Thay đổi mật khẩu</h2>
      </div>
      <div className='mt-[70px] w-full rounded-md'>
        <Form form={form} layout='vertical' onFinish={handlePasswordChange}>
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
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type='primary' htmlType='submit' className='bg-[#D8B979]'>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
