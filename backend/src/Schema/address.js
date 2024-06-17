import Joi from "joi";
export const addressSchema = Joi.object({
    name: Joi.string().required().messages({
        "string.empty": "Name không được để trống",
        "any.required": "Trường Name này là bắt buộc",
        "string.base": "Name phải là 1 string",
    }),
    phone: Joi.number().required().messages({
        "Number.empty": "Phone không được để trống",
        "any.required": "Trường Phone này là bắt buộc",
        "number.base": "Phone phải là số",
    }),

        
        cityLeeched: Joi.string().required().messages({
            "string.empty": "cityLeeched không được để trống",
            "any.required": "Trường cityLeeched này là bắt buộc",
            "string.base": "cityLeeched phải là 1 string",
        }),
        districtLeech: Joi.string().required().messages({
            "string.empty": "districtLeech không được để trống",
            "any.required": "Trường districtLeech này là bắt buộc",
            "string.base": "districtLeech phải là 1 string",

        }),
        communeAddress: Joi.string().required().messages({
             "string.empty": "communeAddress không được để trống",
              "any.required": "Trường communeAddress này là bắt buộc",
               "string.base": "communeAddress phải là 1 string",
             }),
             apartmentNumber: Joi.string().required().messages({
                "string.empty": "apartmentNumber không được để trống",
                "any.required": "Trường apartmentNumber này là bắt buộc",
                "string.base": "apartmentNumber phải là 1 string",
            }),
        detailAddress: Joi.string().messages({
            "string.empty": "detailAddress không được để trống",
            "any.required": "Trường detailAddress này là bắt buộc",
            "string.base": "detailAddress phải là 1 string",
        }),
        customerId: Joi.string().required().messages({
            "string.empty": "customerId không được để trống",
            "any.required": "Trường customerId này là bắt buộc",
            "string.base": "customerId phải là 1 string",
        })
})