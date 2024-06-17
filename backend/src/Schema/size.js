import Joi from "joi";
export const sizeSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name không được để trống",
    "any.required": "Trường Name này là bắt buộc",
    "string.base": "Name phải là 1 string",
  }),
  quantity: Joi.number().required().messages({
    "number.empty": "Quantity không được để trống",
    "any.required": "Trường Quantity này là bắt buộc",
    "number.base": "Quantity phải là 1 string",
  }),
});
