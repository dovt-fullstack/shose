import Cart from "../models/cart.js";
import Product from "../models/product.js";
// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate({
        path: "items.productId",
        model: "Product",
      })
      .populate({
        path: "userId",
        model: "User",
      });
    if (carts.length === 0) {
      return res.status(200).json({
        message: "Lấy danh sách Cart không thành công",
      });
    }
    return res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single cart by ID
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate({
      path: "items.productId",
      model: "Product",
    });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new cart
const createCart = async (req, res) => {
  const { items, userId } = req.body;
  const { size, color, image, quantity } = items[0];
  try {
    //lấy product
    //lấy user
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // kiểm tra sản phẩm đó đã có trong giỏ hàng chưa
      // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
      const product = await Product.findById(items[0].productId);
      cart.items.push({
        productId: items[0].productId,
        size: [...size],
        color: [...color],
        image: [...image],
        quantity: quantity,
        price: product.price * quantity,
        priceSale: product.priceSale * quantity,
        // price: product.priceSale.quantity * quantity,
      });
      await cart.save();
      res.status(200).json({
        message: "Cập nhật giỏ hàng thành công",
        cart: cart,
      });
    } else {
      // Nếu chưa có giỏ hàng, tạo giỏ hàng mới và thêm sản phẩm vào
      const newCart = await Cart.create(req.body);
      const product = await Product.findById(items[0].productId);
      if (!product) {
        return res.status(404).json({ error: "Sản phẩm không tồn tại" });
      }
      newCart.items[0].price = product.price * quantity;
      newCart.items[0].priceSale = product.priceSale * quantity;
      await newCart.save();
      res.status(201).json({
        message: "Thêm Cart thành công",
        cart: newCart,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cart by ID
const updateCart = async (req, res) => {
  const { id } = req.params; // id của user
  const { _id, quantity } = req.body; // id của từng sản phẩm và số lượng chứ không phải id của product

  try {
    const cart = await Cart.findOne({ userId: id });
    // Nếu cart không tồn tại
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Kiểm tra sản phẩm có tồn tại trong giỏ hàng không
    const existingItem = cart.items.find((item) => item._id.toString() === _id);
    if (existingItem) {
      const product = await Product.findById(existingItem.productId);

      // Nếu product không tồn tại
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      existingItem.quantity = quantity;
      existingItem.price = product.price * quantity;
      existingItem.priceSale = product.priceSale * quantity;
    } else {
      return res.status(200).json({
        message: "Cập nhật giỏ hàng không thành công",
      });
    }
    // }

    await cart.save();

    res.status(200).json({
      message: "Cập nhật giỏ hàng thành công",
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a product from cart by userId and productId
const deleteProductFromCart = async (userId, productId) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }
    // Tìm sản phẩm cần xóa trong giỏ hàng
    const deletedItem = cart.items.find(
      (item) => item._id.toString() === productId
    );

    if (!deletedItem) {
      throw new Error("Product not found in cart");
    }

    // Lấy thông tin về giá và số lượng của sản phẩm
    const { price, priceSale, quantity } = deletedItem;

    // Xóa sản phẩm từ mảng items
    cart.items = cart.items.filter((item) => item._id.toString() !== productId);

    // Cập nhật lại tổng giá trị của giỏ hàng
    cart.totalPrice -= price * quantity;
    cart.totalPriceSale -= priceSale * quantity;

    await cart.save();
    // Kiểm tra và xóa sản phẩm từ mảng items
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: productId } } },
      { new: true }
    );

    if (!updatedCart) {
      throw new Error("Product not found in cart");
    }

    return updatedCart;
  } catch (error) {
    throw error;
  }
};

// Delete a cart by ID
const deleteCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await deleteProductFromCart(userId, productId);
    res.status(200).json({ message: "Product deleted from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the controller functions
export { getAllCarts, getCartById, createCart, updateCart, deleteCart };
