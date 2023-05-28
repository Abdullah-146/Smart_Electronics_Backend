const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create a new order   =>  /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  console.log(req.body);

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  let orders = [];
  const orders1 = await Order.find();
  const productsId = await Product.find({ user: req.query.user }, { _id: 1 });
  p_ids = [];
  productsId.map((e) => p_ids.push(String(e._id)));
  // console.log("Products Id: ", p_ids);

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (p_ids.length > 0) {
    orders = orders1.filter(function (item) {
      return (
        p_ids.indexOf(
          item.orderItems.map((i) => {
            return String(i.product);
          })[0]
        ) !== -1 ||
        p_ids.indexOf(
          item.orderItems.map((i) => {
            return String(i.product);
          })[1]
        ) !== -1 ||
        p_ids.indexOf(
          item.orderItems.map((i) => {
            return String(i.product);
          })[2]
        ) !== -1
      );
    });
  }

  // if (p_ids.length > 0) {
  //   orders = orders1.filter(function (item) {
  //     return (
  //       p_ids.indexOf(
  //         item.orderItems.map((i) => {
  //           console.log(i.product);
  //           return String(i.product);
  //         })[0]
  //       ) !== -1
  //     );
  //   });
  // }
  // let temp = [];
  // if (p_ids.length > 0) {
  //   for (let i = 0; i < orders.length; i++) {
  //     for (let j = 0; j <= orders[i].orderItems.length; j++) {
  //       console.log(orders[i].orderItems[j]);
  //     }
  //   }
  // }
  // console.log(temp);
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    productsId: p_ids,
  });
});

// Get all orders - super-admin  =>   /api/v1/super-admin/orders/
exports.superAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
