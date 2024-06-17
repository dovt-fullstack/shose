import Joi from "joi";
export const productSchema = Joi.object({
  name: Joi.string().required().min(4).messages({
    "string.empty": "Name không được để trống",
    "any.required": "Trường Name này là bắt buộc",
    "string.base": "Name phải là 1 string",
    "string.min": "name phải có ít nhất {#limit} ký tự",
  }),
  price: Joi.number().required().messages({
    "string.empty": "Price không được để trống",
    "any.required": "Trường Price này là bắt buộc",
    "number.base": "Price phải là 1 số",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description không được để trống",
    "any.required": "Trường description này là bắt buộc",
    "string.base": "description phải là 1 string",
  }),
  image: Joi.array().required().messages({
    "string.empty": "image không được để trống",
    "any.required": "Trường image này là bắt buộc ",
    "string.base": "image phải là 1 string",
  }),
  listQuantityRemain: Joi.array().required(),
  hot_sale: Joi.number().required(),
  description_short: Joi.string(),
  categoryId: Joi.string().required(),
  warehouseId: Joi.string().required(),
  is_delete: Joi.boolean(),
});
export const UpdateProduct = Joi.object({
  _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
  name: Joi.string().required().min(4).messages({
    "string.empty": "Name không được để trống",
    "any.required": "Trường Name này là bắt buộc",
    "string.base": "Name phải là 1 string",
    "string.min": "name phải có ít nhất {#limit} ký tự",
  }),
  price: Joi.number().required().messages({
    "string.empty": "Price không được để trống",
    "any.required": "Trường Price này là bắt buộc",
    "number.base": "Price phải là 1 số",
  }),
  description: Joi.string().required().messages({
    "string.empty": "description không được để trống",
    "any.required": "Trường description này là bắt buộc",
    "string.base": "description phải là 1 string",
  }),
  image: Joi.array().required().messages({
    "string.empty": "image không được để trống",
    "any.required": "Trường image này là bắt buộc ",
    "string.base": "image phải là 1 string",
  }),
  listQuantityRemain: Joi.array().required(),
  // sizes: Joi.array().required(),
  hot_sale: Joi.number().required(),

  description_short: Joi.string(),
  categoryId: Joi.string().required(),
  warehouseId: Joi.string().required(),
  is_delete: Joi.boolean(),
});
export const imageProductSchema = Joi.object({
  image: Joi.array().required().messages({
    "array.empty": "Image không được để trống",
    "any.required": "Trường Image này là bắt buộc",
    "array.base": "Image phải là 1 array",
  }),
  trang_thai: Joi.string().valid("active", "deactive").required().messages({
    "string.empty": "Trạng thái không được để trống",
    "any.required": "Trường Trạng thái này là bắt buộc",
    "string.base": "Trạng thái phải là 1 String",
  }),
});
export const image_newsSchema = Joi.object({
  image: Joi.array().required().messages({
    "array.empty": "Image không được để trống",
    "any.required": "Trường Image này là bắt buộc",
    "array.base": "Image phải là 1 String",
  }),
  trang_thai: Joi.string().valid("active", "deactive").required().messages({
    "string.empty": "Trạng thái không được để trống",
    "any.required": "Trường Trạng thái này là bắt buộc",
    "string.base": "Trạng thái phải là 1 String",
  }),
  Id_news: Joi.string().required().messages({
    "string.empty": "categoryId không được để trống",
    "any.required": "Trường categoryId này là bắt buộc",
    "string.base": "categoryId phải là 1 string",
  }),
});
export const newsSchema = Joi.object({
  tieude: Joi.string().required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Trường Tiêu đề này là bắt buộc",
    "string.base": "Tiêu đề phải là 1 string",
  }),
  noidung: Joi.string().required().messages({
    "number.empty": "Tiêu đề không được để trống",
    "any.required": "Trường Tiêu đề này là bắt buộc",
    "number.base": "Tiêu đề phải là 1 string",
  }),
  trang_thai: Joi.string().valid("active", "deactive").required().messages({
    "string.empty": "Trạng thái không được để trống",
    "any.required": "Trường Trạng thái này là bắt buộc",
    "string.base": "Trạng thái phải là 1 String",
  }),
  image: Joi.array().required().messages({
    "array.empty": "Image không được để trống",
    "any.required": "Trường Image này là bắt buộc",
    "array.base": "Image phải là 1 String",
  }),
});
export const UpdatenewsSchema = Joi.object({
  _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
  tieude: Joi.string().required().messages({
    "string.empty": "Tiêu đề không được để trống",
    "any.required": "Trường Tiêu đề này là bắt buộc",
    "string.base": "Tiêu đề phải là 1 string",
  }),
  noidung: Joi.string().required().messages({
    "number.empty": "Tiêu đề không được để trống",
    "any.required": "Trường Tiêu đề này là bắt buộc",
    "number.base": "Tiêu đề phải là 1 string",
  }),
  trang_thai: Joi.string().valid("active", "deactive").required().messages({
    "string.empty": "Trạng thái không được để trống",
    "any.required": "Trường Trạng thái này là bắt buộc",
    "string.base": "Trạng thái phải là 1 String",
  }),
  image: Joi.array().required().messages({
    "array.empty": "Image không được để trống",
    "any.required": "Trường Image này là bắt buộc",
    "array.base": "Image phải là 1 String",
  }),
});
export const Updateimage_newsSchema = Joi.object({
  _id: Joi.string().messages({
    "string.empty": 'Trường "id" không được để trống',
  }),
  image: Joi.array().required().messages({
    "array.empty": "Image không được để trống",
    "any.required": "Trường Image này là bắt buộc",
    "array.base": "Image phải là 1 String",
  }),
  trang_thai: Joi.string().valid("active", "deactive").required().messages({
    "string.empty": "Trạng thái không được để trống",
    "any.required": "Trường Trạng thái này là bắt buộc",
    "string.base": "Trạng thái phải là 1 String",
  }),
  Id_news: Joi.string().required().messages({
    "string.empty": "categoryId không được để trống",
    "any.required": "Trường categoryId này là bắt buộc",
    "string.base": "categoryId phải là 1 string",
  }),
});
