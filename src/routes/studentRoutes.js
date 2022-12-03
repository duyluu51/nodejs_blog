const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/studentController");
const isAuth =require('../app/middlewares/authMiddlewares').isAuth
// const fileUploader = require("../config/cloudinary");

router.get("/getStudent",isAuth, studentController.getStudent);
router.post("/create", studentController.create);

module.exports = router;
