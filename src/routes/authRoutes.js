const express = require("express");
const router = express.Router();
const isAuth = require("../app/middlewares/authMiddlewares").isAuth;
const authController = require("../app/controllers/authController.js");

router.post("/register", isAuth, authController.register);
router.post("/login", authController.login);
router.post("/refresh", isAuth, authController.refreshToken);

module.exports = router;
