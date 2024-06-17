import { useAppDispatch, useAppSelector } from '@/store'
import { schemaUserProfile } from '@/utils'
import { Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'

import { useUpdateUserMutation } from '@/store/services/auth.service'
import moment from 'moment'
import { setUser } from '@/store/slices/auth.slice'

const Profile = () => {
  const [form] = Form.useForm()
  const [updateProfile] = useUpdateUserMutation()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const dispatch = useAppDispatch()
  const userString = useAppSelector((state) => state.user)

  const userId = userString?.user?._id

  useEffect(() => {
    if (userString) {
      form.setFieldsValue(userString.user)
      form.setFieldValue('ngaysinh', moment(userString?.user?.ngaysinh).format('YYYY-MM-DD'))
    }
  }, [form, userString])

  const handleProfileUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const { error } = schemaUserProfile.validate(values, { abortEarly: false })
        if (error) {
          const validationErrors: { [key: string]: string } = {}
          error.details.forEach((detail: any) => {
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
            const updatedUser = { ...userString.user, ...values }

            dispatch(setUser(updatedUser))
            message.success('Cập nhật thông tin thành công')
            form.resetFields()
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

  return (
    <div className='my-account grow mt-20'>
      <div className='flex flex-col account'>
        <div className='bg-top-account'></div>

        <div className='account-content relative -top-5 bg-[#fff] mx-4 rounded-md'>
          <div className='account-avatar absolute -top-[60px] left-[calc(50%-60px)] h-[120px] w-[120px] bg-[#fff] rounded-full border-[5px] border-white'>
            <div className='avatar'>
              <div>
                <img
                  className='w-full rounded-full'
                  src={
                    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c27dc0a4-6276-4036-968e-51b70613de6d/dfbouue-a609b605-d553-4450-b56e-9cd707317231.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyN2RjMGE0LTYyNzYtNDAzNi05NjhlLTUxYjcwNjEzZGU2ZFwvZGZib3V1ZS1hNjA5YjYwNS1kNTUzLTQ0NTAtYjU2ZS05Y2Q3MDczMTcyMzEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.49hw3fXDtkGsM1XMh3yk-kwhdUCeRfXTwtdeQnrfuZ0'
                  }
                />
              </div>
              <div className='image-upload'>
                <label className='btn-change-photo' htmlFor='file-input'></label>
                <input className='hidden' id='file-input' type='file' />
              </div>
            </div>
          </div>

          <div className='profile mt-[90px] px-[20px] h-[30rem] text-sm relative'>
            {userString?.user && (
              <Form form={form} layout='vertical' onFinish={handleProfileUpdate}>
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

                <div className='my-5 text-center'>
                  <button
                    className='btn bg-[#d8b979] text-white rounded-xl w-[calc(50%-30px)] uppercase cursor-pointer h-[36px]'
                    type='submit'
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
