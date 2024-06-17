import Joi from "joi";

export const paymentSchema = Joi.object({
    vnp_OrderInfo: Joi.string().required(),
    totalPrice: Joi.number().required(),
    bank_code: Joi.string().allow(""),
    language: Joi.string(),
    user: Joi.string().required(),
});

export const validation = (req, res, next) => {
    const schema = Joi.object({
        user: Joi.string().required("UserId bắt buộc"),
        code: Joi.string(),
        payment_method: Joi.string().required(),
        totalPrice: Joi.number().required(),
        status: Joi.string().required(),
        message: Joi.string(),
    });
    const result = schema.validate(req.body);
    try {
        if (result.error) {
            return res.status(401).json({ error: 2, message: result.error.details[0].message });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            err: 1,
            message: new Error(err).message,
        });
    }
};
