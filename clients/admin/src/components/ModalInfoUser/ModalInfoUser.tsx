import { useUpdateUserMutation } from '@/api/user'
import { schemaUserProfile } from '@/utils'
import { Button, Form, Input, Modal, message } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

interface UserProfileProps {
  handleHideUserProfile: () => void
}

export default function ModalInfoUser({ handleHideUserProfile }: UserProfileProps) {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(true)
  const [updateProfile] = useUpdateUserMutation()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : {}
  const userId = user._id

  useEffect(() => {
    user && form.setFieldValue('ngaysinh', moment(user.ngaysinh).format('YYYY-MM-DD'))
  }, [form, user])
  const handleProfileUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const { error } = schemaUserProfile.validate(values, { abortEarly: false })
        if (error) {
          const validationErrors: { [key: string]: string } = {}
          error.details.forEach((detail) => {
            const path = detail.path[0]
            const message = detail.message
            validationErrors[path] = message
          })
          validationErrors && setErrors(validationErrors)
          return
        }

        const selectedDate = moment(values.ngaysinh, 'YYYY-MM-DD').toDate()

        const updatedValues = {
          ...values,
          ngaysinh: selectedDate.toISOString(),
          _id: userId
        }

        updateProfile(updatedValues)
          .then(() => {
            const updatedUser = { ...user, ...values }
            localStorage.setItem('user', JSON.stringify(updatedUser))

            message.success('Cập nhật thông tin thành công')
            form.resetFields()
            setVisible(false)
            handleHideUserProfile()
          })
          .catch((error) => {
            const errorMessage = error.response.data.message
            message.error(errorMessage)
          })
      })
      .catch((error) => {
        console.log('Validation error:', error)
      })
  }

  const handleCancel = () => {
    setVisible(false)
    handleHideUserProfile()
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      title={<h3 className='text-center'>Thông tin người dùng</h3>}
      footer={[
        <Button key='cancel' onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key='update' onClick={handleProfileUpdate}>
          Cập nhật
        </Button>
      ]}
    >
      <Form form={form} layout='vertical' initialValues={user}>
        <Form.Item name='name' label='Tên' validateStatus={errors?.name ? 'error' : ''} help={errors?.name}>
          <Input />
        </Form.Item>
        <Form.Item
          name='fullname'
          label='Họ và tên đầy đủ'
          validateStatus={errors?.fullname ? 'error' : ''}
          help={errors?.fullname}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='ngaysinh'
          label='Ngày sinh'
          validateStatus={errors?.ngaysinh ? 'error' : ''}
          help={errors?.ngaysinh}
        >
          <Input type='date' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
