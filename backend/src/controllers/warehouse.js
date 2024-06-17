import product from "../models/product.js";
import warehouse from "../models/warehouse.js";

export const warehouseControllers = {
  createWarehouse: async (req, res) => {
    const {
      name,
      productId,
      allInventory,
      address,
      totalSoldOuts,
      phoneNumber,
      productInventory,
    } = req.body;
    try {
      const productall = await product.find({});
      let idProductArr = [];
      for (const v1 of productall) {
        idProductArr.push(v1._id);
      }
      const data = await warehouse.create({
        name,
        productId,
        allInventory,
        address,
        totalSoldOuts,
        productInventory,
        phoneNumber,
      });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getAllWareHouse: async (req, res) => {
    try {
      const data = await warehouse
        .find({})
        .populate({
          path: "productId",
          populate: {
            path: "categoryId",
          },
        })
        .populate("productInventory");
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getIdWareHouse: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await warehouse
        .findById(id)
        .populate({
          path: "productId",
          populate: {
            path: "categoryId",
          },
        })
        .populate("productInventory");
        var totalPriceWareHouse = 0
        for(let i = 0; i < data.productId.length; i++) {
          totalPriceWareHouse += data.productId[i].price
        }
        data.totalSoldOuts = totalPriceWareHouse
        await data.save()
      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  isActiveWareHouse: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      console.log(id);
      const data = await warehouse.updateOne(
        { _id: id },
        {
          $set: {
            status: status,
          },
        },
        {
          new: true,
        }
      );
      return res.json({
        message: "updated successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
   updateWarehouse: async (req, res) => {
    const { id } = req.params;
    const {
      name,
      allInventory,
      address,
      totalSoldOuts,
      phoneNumber,
      status,
      productInventory,
      productId,
    } = req.body;
    try {
      const dataWareHouse = await warehouse.findById(id);
      if (productInventory) {
        const newArr = dataWareHouse.productInventory.filter(
          (it) => !productInventory.includes(it.toString())
        );
        console.log(newArr);
        dataWareHouse.allInventory = dataWareHouse.productInventory.length;
        dataWareHouse.productInventory = newArr;
        await dataWareHouse.save();
      }
      if (productId) {
        const indexProduct = dataWareHouse.productId.filter(
          (v) => !productId.includes(v.toString())
        );
        dataWareHouse.productId = indexProduct;
        await dataWareHouse.save();
      }
      const data = await warehouse.findByIdAndUpdate(
        id,
        {
          $set: {
            name: name,
            allInventory: allInventory,
            address: address,
            totalSoldOuts: totalSoldOuts,
            phoneNumber: phoneNumber,
            status: status,
          },
        },
        {
          new: true,
        }
      );

      return res.json({
        message: "updated successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  deleteWarehouse: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await warehouse.findByIdAndDelete(id);

      return res.json({
        message: "Delete successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
};
