export { default as clsxm } from './clsxm'
import Joi from '@hapi/joi'

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().label('Mật khẩu cũ'),
  newPassword: Joi.string().min(6).required().label('Mật khẩu mới').messages({
    'string.empty': 'Mật khẩu mới không được để trống',
    'string.min': 'Mật khẩu mới phải có ít nhất 6 ký tự',
    'any.required': 'Mật khẩu mới là trường bắt buộc'
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Mật khẩu xác nhận không trùng khớp',
    'any.required': 'Mật khẩu xác nhận là trường bắt buộc'
  })
})

export const schemaUserProfile = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Trường "Tên" không được để trống',
    'any.required': 'Trường "Tên" là bắt buộc'
  }),
  fullname: Joi.string().required().messages({
    'string.empty': 'Trường "Họ và tên đầy đủ" không được để trống',
    'any.required': 'Trường "Họ và tên đầy đủ" là bắt buộc'
  }),
  ngaysinh: Joi.date().min('1900-01-01').max('now').required().messages({
    'date.base': 'Trường "ngày sinh" phải là kiểu ngày tháng hợp lệ',
    'date.empty': 'Trường "ngày sinh" không được để trống',
    'date.min': 'Trường "ngày sinh" phải lớn hơn hoặc bằng 1900-01-01',
    'date.max': 'Trường "ngày sinh" không được lớn hơn ngày hiện tại',
    'any.required': 'Trường "ngày sinh" là bắt buộc'
  })
})
