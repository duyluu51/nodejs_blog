const CourseList = require("../models/CourseModel");

// const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
  // 1. [GET] /getCourse
  getCourse(req, res, next) {
    // handle param
    let modelParam={
      shiftCode:req.query?.shiftCode||null,
      nameShift:req.query?.nameShift||null,
      year:req.query?.year||null,
    }
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
  // End handle param
    CourseList.find(modelParam)
      .then((courseItem) => {
        res.json({ courseItem });
      })
      .catch(next);
  }


  // 2. [post] /create
  async create(req, res, next) {
    try {
      // count all total record
      const totalRecordCourse = await CourseList.count()
      // Check model course
      const newCourseModel ={
        shiftCode:`${totalRecordCourse+1}`,
        nameShift:req.body?.nameShift||null,
        timeContent:req.body?.timeContent||null,
        year:req.body?.year
        ? `${req.body?.year}-${+req.body?.year + 1}`
        : null,
      }
        const newCourse = new CourseList(newCourseModel);
      // save new data
        await newCourse.save()
          console.log("Save data success");
          res.json("OK");
    }
    catch (error){
      res.status(400).send("Bad Request");
    }
  }

}

module.exports = new CourseController();
