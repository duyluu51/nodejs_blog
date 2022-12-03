const express = require("express");
const router = express.Router();
const courseController = require("../app/controllers/courseController");
const isAuth =require('../app/middlewares/authMiddlewares').isAuth

router.get("/getCourse",isAuth, courseController.getCourse);
router.post("/create",isAuth, courseController.create);

module.exports = router;
