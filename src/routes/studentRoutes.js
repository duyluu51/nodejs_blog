const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/studentController");
const isAuth =require('../app/middlewares/authMiddlewares').isAuth
// const fileUploader = require("../config/cloudinary");

router.get("/getStudent",isAuth, studentController.getStudent);
router.get("/getStudentDelete",isAuth, studentController.getStudentDelete);
router.post("/create", studentController.create);
router.put("/update/:id",isAuth, studentController.update);
router.delete("/delete/:id",isAuth, studentController.delete);

module.exports = router;
