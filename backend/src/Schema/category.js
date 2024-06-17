import joi from "joi";
export const CategorySchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Category không được để trống",
    "any.required": "Trường Category này là bắt buộc",
    "string.base": "Category phải là 1 String",
  }),
  desciption: joi.string().required().min(3).messages({
    "string.desciption": "Mô tả không đủ độ dài yêu cầu",
    "string.empty": "Mô tả không được để trống",
  }),
  image: joi.array().required().messages({
    "string.empty": "Anh không được để trống",
  }),
  // status: joi.string().valid("active", "deactive").required().messages({
  //   "string.empty": "Trạng thái không được để trống",
  //   "any.required": "Trường Trạng thái này là bắt buộc",
  //   "string.base": "Trạng thái phải là 1 string",
  // }),
});