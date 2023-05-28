const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  logout,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  superAdminLogin,
  updateUserStatus,
} = require("../controllers/authController");

const {
  isAuthenticatedUser,
  authorizeRoles,
  isAuthenticatedSuperAdmin,
} = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/Superlogin").post(superAdminLogin);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/super-admin/users")
  .get(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), allUsers);
router
  .route("/super-admin/user/:id")
  .get(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), getUserDetails)
  .put(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), updateUser)
  .delete(isAuthenticatedSuperAdmin, authorizeRoles("super-admin"), deleteUser);

router
  .route("/super-admin/update-user-status/:id")
  .put(
    isAuthenticatedSuperAdmin,
    authorizeRoles("super-admin"),
    updateUserStatus
  );

module.exports = router;
