import Joi from "joi";

export const validation = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        status: Joi.string().default("pending"), // Đặt giá trị mặc định là "pending"
        products: Joi.array().items({
            product_id: Joi.string().required(),
            color: Joi.string().required(),
            size: Joi.string().required(),
            quantity: Joi.number().required(),
        }),
        total_price: Joi.number().required(),
        address: Joi.string().required(),
        sale_id: Joi.string().default(null), // Cho phép giá trị là null
        total_amount_paid:Joi.number().default(0),
        payment_type:Joi.string().default('cash'),
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
