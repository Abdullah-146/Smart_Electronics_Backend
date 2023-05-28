const express = require("express");
const router = express.Router();

const {
  getProducts,
  getAdminProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  superGetAdminProducts,
} = require("../controllers/productController");

const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedSuperAdmin,
} = require("../middlewares/auth");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/super-admin/products").get(superGetAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/super-admin/product/:id")
  .put(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), updateProduct)
  .delete(
    isAuthenticatedSuperAdmin,
    authorizeRoles("super-admin"),
    deleteProduct
  );

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
