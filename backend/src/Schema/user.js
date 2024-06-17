import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": 'Trường "tên" không được để trống',
    "any.required": 'Trường "tên" là bắt buộc',
  }),
  fullname: Joi.string().required().messages({
    "string.empty": 'Trường "tên khách hàng" không được để trống',
    "any.required": 'Trường "tên khách hàng" là bắt buộc',
  }),
  ngaysinh: Joi.date()
  .min('1900-01-01')
  .max('now')
  .required()
  .messages({
    'date.base': 'Trường "ngày sinh" phải là kiểu ngày tháng hợp lệ',
    'date.empty': 'Trường "ngày sinh" không được để trống',
    'date.min': 'Trường "ngày sinh" phải lớn hơn hoặc bằng 1900-01-01',
    'date.max': 'Trường "ngày sinh" không được lớn hơn ngày hiện tại',
    'any.required': 'Trường "ngày sinh" là bắt buộc',
  }),
  email: Joi.string().email().required().messages({
    "string.empty": 'Trường "email" không được để trống',
    "string.email": 'Trường "email" không đúng định dạng',
    "any.required": 'Trường "email" là bắt buộc',
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": 'Trường "mật khẩu" không được để trống',
    "string.min": 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
    "any.required": "Trường mật khẩu là bắt buộc",
  }),
  role: Joi.string().messages({
    "string.empty": 'Trường "role" không được để trống',
  }),
  role_name: Joi.string().messages({
    "string.empty": 'Trường "role_name" không được để trống',
  }),
  image_url: Joi.string().messages({
    "string.empty": 'Trường "image_url" không được để trống',
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "string.empty": 'Trường "xác nhận mật khẩu" không được để trống',
    "any.required": "Trường xác nhận mật khẩu là bắt buộc",
    "any.only": 'Trường "xác nhận mật khẩu" không khớp',
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": 'Trường "email" không được để trống',
    "string.email": 'Trường "email" không đúng định dạng',
    "any.required": 'Trường "email" là bắt buộc',
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": 'Trường "mật khẩu" không được để trống',
    "string.min": 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
    "any.required": "Trường mật khẩu là bắt buộc",
  }),
});
export const updateSchema = Joi.object({
  _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
  name: Joi.string().required().messages({
    "string.empty": 'Trường "tên" không được để trống',
    "any.required": 'Trường "tên" là bắt buộc',
  }),
  fullname: Joi.string().required().messages({
    "string.empty": 'Trường "tên khách hàng" không được để trống',
    "any.required": 'Trường "tên khách hàng" là bắt buộc',
  }),
  ngaysinh: Joi.date()
  .min('1900-01-01')
  .max('now')
  .required()
  .messages({
    'date.base': 'Trường "ngày sinh" phải là kiểu ngày tháng hợp lệ',
    'date.empty': 'Trường "ngày sinh" không được để trống',
    'date.min': 'Trường "ngày sinh" phải lớn hơn hoặc bằng 1900-01-01',
    'date.max': 'Trường "ngày sinh" không được lớn hơn ngày hiện tại',
    'any.required': 'Trường "ngày sinh" là bắt buộc',
  }),
  // email: Joi.string().email().required().messages({
  //   "string.empty": 'Trường "email" không được để trống',
  //   "string.email": 'Trường "email" không đúng định dạng',
  //   "any.required": 'Trường "email" là bắt buộc',
  // }),
  // image_url: Joi.string().required().messages({
  //   "string.empty": 'Trường "image_url" không được để trống',
  //   "any.required": "Trường image_url là bắt buộc",
  // }),
  // confirmPassword: Joi.string().required().messages({
  //   "string.empty": 'Trường "confirmPassword" không được để trống',
  //   "any.required": 'Trường "confirmPassword" là bắt buộc',
  // }),
});

export const updateAdminSchema = Joi.object({
  _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
  role: Joi.string().messages({
    "string.empty": 'Trường "role" không được để trống',
  }),
  role_name: Joi.string().messages({
    "string.empty": 'Trường "role_name" không được để trống',
  }),
});

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().label('Mật khẩu cũ'),
  newPassword: Joi.string().min(6).required().label('Mật khẩu mới').messages({
      "string.empty": "mật khẩu mới không được để trống",
      "string.min": "mật khẩu mới phải có ít nhất 5 ký tự",
      "any.required": "mật khẩu mới là trường bắt buộc"
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
      "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
      "any.required": "confirmPassword là trường bắt buộc",
    }).options({ abortEarly: false }),
});

export const resetPasswordSchema = Joi.object({
  newPassword: Joi.string().min(6).required().label('Mật khẩu mới').messages({
      "string.empty": "mật khẩu mới không được để trống",
      "string.min": "mật khẩu mới phải có ít nhất 6 ký tự",
      "any.required": "mật khẩu mới là trường bắt buộc"
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")).messages({
      "any.only": "Mật khẩu bạn vừa nhập không trùng khớp hãy nhập lại",
      "any.required": "confirmPassword là trường bắt buộc",
    }).options({ abortEarly: false }),
});
