import User from "../models/user.js";
import FavoriteProduct from "../models/favoriteProducts.js";

export const createFavoriteProduct = async (req, res) => {
  const { customerId, productId } = req.body;
  try {
    const favoriteProduct = new FavoriteProduct({
      customerId: customerId,
      productId: productId,
    });

    await favoriteProduct.save();

    // Thêm favoriteProduct vào danh sách yêu thích của khách hàng
    await User.findByIdAndUpdate(customerId, {
      $push: { favoriteProducts: productId },
    });
    res.status(200).json({ message: "Đã thêm sản phẩm yêu thích thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm sản phẩm yêu thích." });
  }
};
export const removeFavoriteProduct = async (req, res) => {
  const { customerId, productId } = req.body;

  try {
    // Xóa favoriteProduct khỏi danh sách yêu thích của khách hàng
    await User.findOneAndUpdate(
      { _id: customerId, favoriteProducts: productId },
      { $pull: { favoriteProducts: productId } },
      { new: true }
    );

    // Xóa favoriteProduct khỏi collection FavoriteProduct
    await FavoriteProduct.deleteOne({
      customerId: customerId,
      productId: productId,
    });
    res.status(200).json({ message: "Đã xóa sản phẩm yêu thích thành công." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa sản phẩm yêu thích." });
  }
};
