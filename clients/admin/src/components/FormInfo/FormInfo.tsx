import { useEffect, useState } from 'react'

import { useAddInformationMutation, useUpdateInformationMutation } from '@/api/informations'
import { Button, Form, Input, Modal, Upload } from 'antd'
import { toast } from 'react-toastify'

import { IInformation } from '@/interfaces'

type FormSaleProps = {
  isModalOpen: boolean
  setIsModalOpen: () => void
  mode: 'create' | 'edit'
  defaultValues?: IInformation
}

type FieldType = {
  title: string
  email: string
  phone: number
  image: string
  logo: string
  address: string
  nameStore: string
}

export default function FormInfo({ isModalOpen, setIsModalOpen, mode, defaultValues }: FormSaleProps) {
  const [form] = Form.useForm()

  const [updateInfo, { isLoading: updateLoad }] = useUpdateInformationMutation()
  const [addInformation, { isLoading: createLoad }] = useAddInformationMutation()

  const [fileList, setFileList] = useState<any[]>([])

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues)
    }
  }, [defaultValues, form])

  useEffect(() => {
    if (mode === 'create') {
      form.resetFields()
    }
  }, [form, isModalOpen, mode])

  const onFileChange = ({ fileList }: any) => {
    setFileList(fileList)
  }

  const handleSubmit = (values: IInformation) => {
    if (mode === 'create') {
      addInformation(values)
        .unwrap()
        .then(() => {
          toast.success('Thêm thông tin thành công !')
          setIsModalOpen()
        })
        .catch((error) => toast.error('Thất bại ' + error.message))
    }
    if (mode === 'edit' && defaultValues) {
      updateInfo({ ...values, _id: defaultValues?._id || '' })
        .unwrap()
        .then(() => {
          toast.success('Sửa thông tin thành công !')
          setIsModalOpen()
        })
        .catch((error) => toast.error('Thất bại ' + error.message))
    }
  }

  return (
    <div>
      <Modal
        centered
        title={mode === 'create' ? 'Tạo mới mã giảm giá' : 'Chỉnh sửa mã giảm giá'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen()
          form.resetFields()
        }}
        width={800}
        footer={() => (
          <div className='flex justify-end'>
            <Button className='bg-[#0084ff]  text-white' onClick={setIsModalOpen}>
              Hủy bỏ
            </Button>
            <Button
              loading={createLoad || updateLoad}
              className='ml-4 bg-[#30bf3e]  text-white'
              onClick={() => form.submit()}
            >
              Submit
            </Button>
          </div>
        )}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleSubmit}
          autoComplete='off'
          form={form}
        >
          <Form.Item<FieldType>
            label='Tiêu đề'
            name='title'
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề !' }]}
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
            label='Ảnh'
            name='image'
            rules={[{ required: true, message: 'Vui lòng nhập link ảnh !' }]}
            hasFeedback
          >
            {defaultValues ? (
              <Input />
            ) : (
              <Upload
                customRequest={() => {}}
                onChange={onFileChange}
                fileList={fileList}
                listType='picture'
                beforeUpload={() => false}
              >
                <Button>Chọn ảnh</Button>
              </Upload>
            )}
          </Form.Item>

          <Form.Item<FieldType>
            label='Logo'
            name='logo'
            rules={[{ required: true, message: 'Vui lòng chọn ảnh !' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Địa chỉ'
            name='address'
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ !' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Tên của hàng'
            name='nameStore'
            rules={[{ required: true, message: 'Vui lòng nhập tên của hàng !' }]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
