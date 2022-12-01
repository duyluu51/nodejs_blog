const StudentList = require("../models/StudentModel");

// const {mongooseToObject} = require('../../util/mongoose')

class StudentController {
  // [GET] /all
  getAll(req, res, next) {
    StudentList.find({})
      .then((studentItem) => {
        res.json({ studentItem });
      })
      .catch(next);
  }

  // [post] /create
  create(req, res, next) {
    console.log(req.body);
    const student = new StudentList(req.body);
    student
      .save()
      .then(() => {
        console.log("Save data success");
      })
      .then(() => {
        res.json("OK");
      })
      .catch((err) => {
        res.status(400).send("Bad Request");
      });
  }
}

module.exports = new StudentController();
