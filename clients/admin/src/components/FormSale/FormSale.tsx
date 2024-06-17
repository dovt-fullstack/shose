import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect } from 'react'

import { useNewSaleMutation, useUpdateSaleMutation } from '@/api/sale'
import { ISale } from '@/interfaces/sale'
import { Option } from 'antd/es/mentions'
import { toast } from 'react-toastify'

type FormSaleProps = {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<boolean>
  mode: 'create' | 'edit'
  defaultValues?: ISale
}

const FormSale = ({ isModalOpen, setIsModalOpen, mode, defaultValues }: FormSaleProps) => {
  const [form] = useForm()
  const [newSale, { isLoading: isLoadingCreate }] = useNewSaleMutation()
  const [updateSale, { isLoading: isLoadingUpdate }] = useUpdateSaleMutation()

  useEffect(() => {
    if (defaultValues) {
      form.setFieldsValue(defaultValues)
    }
  }, [defaultValues, form])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (values: ISale) => {
    if (mode === 'create') {
      newSale(values)
        .unwrap()
        .then(() => {
          toast.success('Thêm mã giảm giá thành công !')
          setIsModalOpen(false)
        })
        .catch((error) => toast.error('Thất bại ' + error.message))
    }
    if (mode === 'edit' && defaultValues) {
      updateSale({ ...values, _id: defaultValues?._id || '' })
        .unwrap()
        .then(() => {
          toast.success('Sửa mã giảm giá thành công !')
          setIsModalOpen(false)
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
        onCancel={handleCancel}
        width={800}
        footer={() => (
          <div className='flex justify-end'>
            <Button className='bg-[#0084ff]  text-white' onClick={handleCancel}>
              Hủy bỏ
            </Button>
            <Button
              loading={isLoadingCreate || isLoadingUpdate}
              className='ml-4 bg-[#30bf3e]  text-white'
              onClick={() => form.submit()}
            >
              Submit
            </Button>
          </div>
        )}
      >
        <Form form={form} labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} onFinish={handleSubmit} className='p-6'>
          <Row gutter={60}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='name'
                label='Tên mã giảm giá'
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input size='large' placeholder='Tên mã giảm giá...' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='code'
                label='Mã code'
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input size='large' placeholder='Nhập mã code...' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='type'
                label='Loại giảm giá'
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Select placeholder='Select a option and change input text above' allowClear>
                  <Option value='cash'>Giảm tiền mặt</Option>
                  <Option value='percent'>Giảm theo phần trăn</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='sale'
                label='Giảm giá (20% hoặc 200.000 vnđ)'
                rules={[{ required: true }, { whitespace: true }]}
              >
                <Input type='number' size='large' placeholder='Giảm giá...' />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='usageLimit'
                label='Số lần dùng'
                rules={[{ required: true }]}
              >
                <InputNumber type='number' size='large' className='w-full' placeholder='Số lần dùng..' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                name='expirationDate'
                label='Ngày hết hạn'
                rules={[{ required: true }]}
              >
                <Input type='date' size='large' placeholder='Địa chỉ email..' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default FormSale
