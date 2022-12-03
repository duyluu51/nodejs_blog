const StudentList = require("../models/StudentModel");

// const {mongooseToObject} = require('../../util/mongoose')

class StudentController {
  // [GET] /getStudent
  getStudent(req, res, next) {
    // handle param
    let modelParam={
      name:req.query?.name?new RegExp(req.query?.name, 'i'):null,
      class:req.query?.class?new RegExp(req.query?.class, 'i'):null,
      school:req.query?.school?new RegExp(req.query?.school, 'i'):null,
      phoneNumber:req.query?.phoneNumber?new RegExp(req.query?.phoneNumber, 'i'):null,
      shift:req.query?.shift||null,
      year:req.query?.year||null,
      idStudent:req.query?.idStudent||null
    }
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
    console.log(modelParam);
  // End handle param
    StudentList.find(modelParam)
      .then((studentItem) => {
        res.json({ studentItem });
      })
      .catch(next);
  }

  // [post] /create
  async create(req, res, next) {
    try {
      // count all total record
      const totalRecordStudent = await StudentList.count()
      // Check model student
      const newStudentModel ={
        name:req.body?.name||null,
        class:req.body?.class||"",
        school:req.body?.school||"",
        phoneNumber:req.body?.phoneNumber||"",
        shift:req.body?.shift||null,
        year:req.body?.year?`${req.body?.year}-${+req.body?.year+1}`:null,
        idStudent:req.body?.year?`${req.body?.year}No${totalRecordStudent+1}`:null
      }
        const student = new StudentList(newStudentModel);
      // save new data
        await student.save()
          console.log("Save data success");
          res.json("OK");
    }
    catch (error){
      res.status(400).send("Bad Request");
    }
  }

   // [put] /update
   async update(req, res, next) {
    try {
      // Check model student
      const updateStudentModel ={
        name:req.body?.name||null,
        class:req.body?.class||null,
        school:req.body?.school||null,
        phoneNumber:req.body?.phoneNumber||null,
        shift:req.body?.shift||null,
      }
      for (var key in updateStudentModel) {
        if (!updateStudentModel[key]) {
          delete updateStudentModel[key];
        }
      }
      // save new data
        await StudentList.findOneAndUpdate({_id:req.params.id}, updateStudentModel)
          console.log("Save data success");
          res.json("OK");
    }
    catch (error){
      res.status(400).send("Bad Request");
    }
  }
}

module.exports = new StudentController();
