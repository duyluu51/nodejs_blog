const express = require("express");
const router = express.Router();
const paymentController = require("../app/controllers/paymentController");
const isAuth = require("../app/middlewares/authMiddlewares").isAuth;

router.get("/getPayment", isAuth, paymentController.getPayment);
router.get("/getPaymentByStudent", paymentController.getPaymentByStudent);
router.put("/updatePayment/:id", isAuth, paymentController.updatePayment);

module.exports = router;
