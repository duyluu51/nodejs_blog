const express = require("express");
const router = express.Router();
const studentController = require("../app/controllers/studentController");
// const fileUploader = require("../config/cloudinary");

router.get("/getAll", studentController.getAll);
router.post("/create", studentController.create);

module.exports = router;
