import Joi from "joi";
export const colorSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Color không được để trống",
    "any.required": "Trường Color này là bắt buộc",
    "string.base": "Color phải là 1 string",
  }),
});
