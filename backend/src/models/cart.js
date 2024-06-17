import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  size: { type: Array, required: true, default: [] },
  color: { type: Array, required: true, default: [] },
  image: { type: Array, required: true, default: [] },
  quantity: { type: Number, required: true },
  price: { type: Number },
  priceSale: { type: Number },
}, { timestamps: true, versionKey: false });

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
  totalpriceSale: { type: Number, default: 0 },
}, { timestamps: true, versionKey: false });
cartSchema.pre("save", async function (next) {
  const cart = this;
  let totalQuantity = 0;
  let totalPrice = 0;
  let totalpriceSale = 0;

  for (const item of cart.items) {
    if (item.quantity) {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
      totalpriceSale += item.priceSale * item.quantity;
    }
  }

  cart.totalQuantity = totalQuantity;
  cart.totalPrice = totalPrice;
  cart.totalpriceSale = totalpriceSale;

  next();
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
