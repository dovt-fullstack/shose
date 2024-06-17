import Order from "../models/orders.js";
import User from "../models/user.js";

import Product from "../models/product.js";
import Category from "../models/category.js";

export const analyticController = {

  getWeeklyRevenueByStatusAndCurrentMonth: async (status) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // Lấy tháng hiện tại (bắt đầu từ 0)

    // Xác định ngày đầu tiên và cuối cùng của tháng hiện tại
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Lấy số tuần trong tháng
    const totalWeeks = Math.ceil((lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1) / 7);


    let weeklyRevenue = [];

    // Lặp qua các tuần trong tháng
    for (let week = 1; week < totalWeeks; week++) {
      // Xác định ngày đầu tiên và cuối cùng của tuần
      const startOfWeek = new Date(currentYear, currentMonth, (week - 1) * 7 + 1);
      const endOfWeek = new Date(currentYear, currentMonth, week * 7);

      // Đảm bảo rằng endOfWeek không vượt quá ngày cuối cùng của tháng
      if (endOfWeek > lastDayOfMonth) {
        endOfWeek.setDate(lastDayOfMonth.getDate());
      }

      const ordersInWeek = await Order.find({
        status,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      });

      const totalRevenueInWeek = ordersInWeek.reduce((total, order) => total + order.total_price, 0);

      weeklyRevenue.push({
        week: week,
        totalRevenue: totalRevenueInWeek,
      });
    }

    return weeklyRevenue;
  },

  /* tổng số tiền thu theo từng tháng */
  countOrderByStatusAndMonth: async (status) => {
    const currentYear = new Date().getFullYear();
    let monthlyRevenue = [];

    for (let month = 1; month <= 12; month++) {
      const startOfMonth = new Date(currentYear, month - 1, 1);
      const endOfMonth = new Date(currentYear, month, 0, 23, 59, 59, 999);

      const ordersInMonth = await Order.find({
        status,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const totalRevenueInMonth = ordersInMonth.reduce((total, order) => total + order.total_price, 0);

      monthlyRevenue.push({
        month: month,
        totalRevenue: totalRevenueInMonth,
      });
    }

    return monthlyRevenue;
  },

  analytics: async (_, res) => {
    try {
      /* đếm số lượng khách hàng */
      const countUsers = await User.countDocuments(); /* lấy hết user đang có */
      const countUserActive = await User.countDocuments({ status: 'active' });
      const countUserInActive = await User.countDocuments({ status: 'inActive' });

      /* đếm số lượng sản phẩm */
      const countProducts = await Product.countDocuments(); /* lấy hết product đang có */
      const countProductActive = await Product.countDocuments({ is_active: true });
      const countProductInActive = await Product.countDocuments({ is_active: false });
      const countProductDeleted = await Product.countDocuments({ is_deleted: true });
      const countProductNotDeleted = await Product.countDocuments({ is_deleted: false });
      /* category */
      const countCategorys = await Category.countDocuments(); /* lấy hết category đang có */
      const countCategoryActive = await Category.countDocuments({ is_deleted: true });
      const countCategoryInActive = await Category.countDocuments({ is_deleted: false });
      /* get total day */
      const totalMoneyDays = await Order.find({
        status: 'done',
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        },
      }).select('total_price');
      /* số tiền thu được trong tuần */
      const totalMoneyWeeks = await Order.find({
        status: 'done',
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7),
        },
      }).select('total_price');
      /* get total month */
      const totalMoneyMonths = await Order.find({
        status: 'done',
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }).select('total_price');
      const totalMoneyDay = totalMoneyDays.reduce((a, b) => a + b.total_price, 0);
      const totalMoneyWeek = totalMoneyWeeks.reduce((a, b) => a + b.total_price, 0);
      const totalMoneyMonth = totalMoneyMonths.reduce((a, b) => a + b.total_price, 0);

      /* số lượng order 1 ngayf */
      const countOrders = await Order.countDocuments(); /* lấy hết order đang có */
      const countOrderActive = await Order.countDocuments({ isActive: true });
      const countOrderInActive = await Order.countDocuments({ isActive: false });
      const countOrderExpiration = await Order.countDocuments({
        isActive: true,
        endDate: { $gte: new Date() }, // Chỉ lấy các order chưa hết hạn
      });
      const countOrderNotExpiration = await Order.countDocuments({
        isActive: true,
        endDate: { $lt: new Date() }, // Chỉ lấy các order đã hết hạn
      });
      /* order có trạng thái là pending */
      const countOrderPending = await Order.countDocuments({ status: 'pending' });
      /* số tiến có trạng thái là pending */
      const countOrderPendingMoneys = await Order.find({ status: 'pending' }).select('total_price');
      /* order có trạng thái là waiting */
      const countOrderConfirmed = await Order.countDocuments({ status: 'waiting' });
      /* số tiến có trạng thái là waiting */
      const countOrderConfirmedMoneys = await Order.find({ status: 'waiting' }).select('total_price');
      /* order có trạng thái là delivered */
      const countOrderDelivered = await Order.countDocuments({ status: 'delivering' });
      /* số tiến có trạng thái là done */
      const countOrderDeliveredMoneys = await Order.find({ status: 'done' }).select('total_price');
      /* order có trạng thái là done */
      const countOrderDone = await Order.countDocuments({ status: 'done' });
      /* order có trạng thái là cancel */
      const countOrderCanceled = await Order.countDocuments({ status: 'cancel' });
      /* tổng số tiền có trạng thái là cancalled */
      const countOrderCanceledMoneys = await Order.find({ status: 'cancel' }).select('total_price');
      /* order có trạng thái là pending và đã hết hạn */
      const countOrderPendingExpiration = await Order.countDocuments({
        status: 'pending',
        endDate: { $gte: new Date() }, // Chỉ lấy các order chưa hết hạn
      });

      return res.status(200).json({

        countOrderDay: [
          { name: 'total', value: countOrders },
          { name: 'active', value: countOrderActive },
          { name: 'inActive', value: countOrderInActive },
          { name: 'expiration', value: countOrderExpiration },
          { name: 'notExpiration', value: countOrderNotExpiration },
        ],
        countOrderStatus: [
          { name: 'pending', value: countOrderPending },
          { name: 'waiting', value: countOrderConfirmed },
          // { name: 'delivered', value: countOrderDelivered },
          { name: 'done', value: countOrderDone },
          { name: 'cancel', value: countOrderCanceled },
          // { name: 'pendingExpiration', value: countOrderPendingExpiration },
        ],
        moneys: [
          {
            name: 'totalMoneyDay',
            value: totalMoneyDay,
          },
          {
            name: 'totalMoneyWeek',
            value: totalMoneyWeek,
          },
          {
            name: 'totalMoneyMonth',
            value: totalMoneyMonth,
          },
        ],

        /* money order status */
        moneyOrderStatus: [
          {
            name: 'pending',
            value: countOrderPendingMoneys.reduce((a, b) => a + b.total_price, 0),
          },
          {
            name: 'waiting',
            value: countOrderConfirmedMoneys.reduce((a, b) => a + b.total_price, 0),
          },
          {
            name: 'done',
            value: countOrderDeliveredMoneys.reduce((a, b) => a + b.total_price, 0),
          },
          {
            name: 'cancel',
            value: countOrderCanceledMoneys.reduce((a, b) => a + b.total_price, 0),
          },
        ],
        /* users */
        users: [
          { name: 'total', value: countUsers },
          { name: 'active', value: countUserActive },
          { name: 'inActive', value: countUserInActive },
        ],
        /* products */
        products: [
          { name: 'total', value: countProducts },
          { name: 'active', value: countProductActive },
          { name: 'inActive', value: countProductInActive },
          { name: 'deleted', value: countProductDeleted },
          { name: 'notDeleted', value: countProductNotDeleted },
        ],
        /* ategory */
        categorys: [
          { name: 'total', value: countCategorys },
          { name: 'active', value: countCategoryActive },
          { name: 'inActive', value: countCategoryInActive },
        ],
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  analyticMonth: async (req, res) => {
    try {
      /* order có trạng thái là pending theo tháng */
      const countOrderPendingMonth = await analyticController.countOrderByStatusAndMonth('pending');
      /* order có trạng thái là waiting theo tháng */
      const countOrderConfirmedMonth = await analyticController.countOrderByStatusAndMonth(
        'waiting'
      );
      /* order có trạng thái là done theo tháng */
      const countOrderDoneMonth = await analyticController.countOrderByStatusAndMonth('done');
      /* order có trạng thái là cancel theo tháng */
      const countOrderCanceledMonth = await analyticController.countOrderByStatusAndMonth(
        'cancel'
      );

      /* số tiền thu được theo tuần */
      const totalMoneyWeeksPending =
        await analyticController.getWeeklyRevenueByStatusAndCurrentMonth('pending');
      const totalMoneyWeeksConfirmed =
        await analyticController.getWeeklyRevenueByStatusAndCurrentMonth('waiting');
      const totalMoneyWeeksDone = await analyticController.getWeeklyRevenueByStatusAndCurrentMonth(
        'done'
      );
      const totalMoneyWeeksCanceled =
        await analyticController.getWeeklyRevenueByStatusAndCurrentMonth('cancel');

      return res.status(200).json({
        orders: [
          {
            name: 'weeks',
            analytics: [
              {
                name: 'pending',
                analytics: totalMoneyWeeksPending,
              },
              {
                name: 'waiting',
                analytics: totalMoneyWeeksConfirmed,
              },
              {
                name: 'done',
                analytics: totalMoneyWeeksDone,
              },
              {
                name: 'cancel',
                analytics: totalMoneyWeeksCanceled,
              },
            ],
          },
          {
            name: 'months',
            analytics: [
              {
                pending: countOrderPendingMonth,
                waiting: countOrderConfirmedMonth,
                done: countOrderDoneMonth,
                cancel: countOrderCanceledMonth,
              },
            ],
          },
        ],
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  analysticTotal: async (req, res) => {
    var doanh_thu = 0;
    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const result = await Order.find({
      $expr: {
        $and: [
          { $eq: [{ $year: '$createdAt' }, currentYear] },
          { $eq: [{ $month: '$createdAt' }, currentMonth] },
        ],
      },
    });
    const vvv = await Order.aggregate([
      {
        $project: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          total_price: '$total_price',
          status: '$status',
        },
      },
    ]);
    var list_doanhthu = {};
    for (const v of vvv) {
      if (v.status == 'cancel') continue;
      if (list_doanhthu['tháng ' + v.month] == undefined)
        list_doanhthu = {
          ...list_doanhthu,
          ...{ ['tháng ' + v.month]: { count: 1, money: v.total_price } },
        };
      else
        list_doanhthu['tháng ' + v.month] = {
          count: list_doanhthu['tháng ' + v.month].count + 1,
          money: list_doanhthu['tháng ' + v.month].money + v.total_price,
        };
    }
    
    var all_dth = 0;
    const all_dt = await Order.find({});
    for (const v of all_dt) if (v.status != 'canceled') all_dth += v.total;
    
    //vùng ngày
    const { fromDate, toDate, selectDate } = req.query;
    var AnaZone = [];
    if (fromDate && toDate) {
      var res1 = await Order.find({
        createdAt: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      });
      if (selectDate) res1 = await Order.find({ createdAt: new Date(selectDate) });
      //doanh thu tuần tự
      var dt_toDate = 0;
      var cancel_order_toDate = 0;
      var done_order_toDate = 0;
      var vnpay_toDate = 0;
      for (const value of res1) {
        dt_toDate += value.total_price; //dt
        if (value.status == 'cancel') cancel_order_toDate += 1;
        if (value.status == 'dont') done_order_toDate += 1;
        if (value.paymentMethodId == 'vnpay') vnpay_toDate += 1;
      }
      AnaZone = {
        'doanh thu vùng này': dt_toDate,
        'đơn hàng đã huỷ': cancel_order_toDate,
        'đơn hàng thành công': done_order_toDate,
        'trả tiền bằng vnpay': vnpay_toDate,
        'trả tiền bằng tiền mặt': res1.length - vnpay_toDate,
      };
    }


    res.json({
      '*theo thời gian tuỳ ý': AnaZone,
      'doanh thu tháng này': {
        'tháng này': doanh_thu,
        'tổng doanh thu': all_dth,
        'số đơn': list_doanhthu,
      },
    });

  },


};
