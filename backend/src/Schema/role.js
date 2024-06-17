import Joi from "joi";

export const createRoleSchema = Joi.object({
  role_name: Joi.string()
    .required()
    .messages({
      "string.empty": 'Trường "role_name" không được để trống',
      "any.required": 'Trường "role_name" là bắt buộc',
    }),
});

export const updateRoleSchema = Joi.object({
    _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
    role_name: Joi.string().required().messages({
      "string.empty": 'Trường "tên" không được để trống',
      "any.required": 'Trường "tên" là bắt buộc',
    }),
    description: Joi.string().required().messages({
        "string.empty": 'Trường "mô tả" không được để trống',
        "any.required": 'Trường "mô tả" là bắt buộc',
    }),
    
});
  

