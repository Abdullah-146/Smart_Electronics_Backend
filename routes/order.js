const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  superAllOrders,
} = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedSuperAdmin,
} = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router
  .route("/super-admin/orders/")
  .get(
    isAuthenticatedSuperAdmin,
    authorizeRoles("super-admin"),
    superAllOrders
  );
router
  .route("/super-admin/order/:id")
  .put(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), updateOrder)
  .delete(
    isAuthenticatedSuperAdmin,
    authorizeRoles("super-admin"),
    deleteOrder
  );

module.exports = router;
