const StudentList = require("../models/StudentModel");
const Payment = require("../models/PaymentModel");

// const {mongooseToObject} = require('../../util/mongoose')

class StudentController {
  // 1. [GET] /getStudent
  getStudent(req, res, next) {
    // handle param
    let modelParam = {
      name: req.query?.name ? new RegExp(req.query?.name, "i") : null,
      class: req.query?.class ? new RegExp(req.query?.class, "i") : null,
      school: req.query?.school ? new RegExp(req.query?.school, "i") : null,
      phoneNumber: req.query?.phoneNumber
        ? new RegExp(req.query?.phoneNumber, "i")
        : null,
      shift: req.query?.shift || null,
      year: req.query?.year || null,
      idStudent: req.query?.idStudent || null,
    };
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
    // End handle param
    StudentList.find(modelParam)
      .then((studentItem) => {
        res.json({ studentItem });
      })
      .catch(next);
  }

  // 2. [GET] /getStudentDelete
  getStudentDelete(req, res, next) {
    // handle param
    let modelParam = {
      name: req.query?.name ? new RegExp(req.query?.name, "i") : null,
      class: req.query?.class ? new RegExp(req.query?.class, "i") : null,
      school: req.query?.school ? new RegExp(req.query?.school, "i") : null,
      phoneNumber: req.query?.phoneNumber
        ? new RegExp(req.query?.phoneNumber, "i")
        : null,
      shift: req.query?.shift || null,
      year: req.query?.year || null,
      idStudent: req.query?.idStudent || null,
    };
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
    // End handle param
    StudentList.findDeleted({ modelParam })
      .then((studentItem) => {
        res.json({ studentItem: studentItem.filter((item) => item.deleted) });
      })
      .catch(next);
  }

  // 3. [post] /create
  async create(req, res, next) {
    try {
      // count all total record
      const totalRecordDeletedStudent = await StudentList.countDeleted();
      const totalRecordUnDeleteStudent = await StudentList.count();
      const totalRecord =totalRecordDeletedStudent+totalRecordUnDeleteStudent
      // Check model student
      const newStudentModel = {
        name: req.body?.name || null,
        class: req.body?.class || "",
        school: req.body?.school || "",
        phoneNumber: req.body?.phoneNumber || "",
        shift: req.body?.shift || null,
        year: req.body?.year
          ? `${req.body?.year}-${+req.body?.year + 1}`
          : null,
        idStudent: req.body?.year
          ? `${req.body?.year}No${totalRecord + 1}`
          : null,
        
      };
      // save new data student
      const student = new StudentList(newStudentModel);

      // Create new data payment
      const monthlyPaymentModel = {
        cashAmount: 0,
        note: "",
      };
      const paymentModel = {
        idStudent: newStudentModel.idStudent,
        shift: newStudentModel.shift,
        jan: monthlyPaymentModel,
        feb: monthlyPaymentModel,
        mar: monthlyPaymentModel,
        apr: monthlyPaymentModel,
        may: monthlyPaymentModel,
        jun: monthlyPaymentModel,
        jul: monthlyPaymentModel,
        aug: monthlyPaymentModel,
        sep: monthlyPaymentModel,
        oct: monthlyPaymentModel,
        nov: monthlyPaymentModel,
        dec: monthlyPaymentModel,
      };
      const paymentNew = new Payment(paymentModel);
      // Save in database
      await Promise.all([student.save(), paymentNew.save()]);
      // End handle
      res.json("Save data success");
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }

  // 4. [put] /update
  async update(req, res, next) {
    try {
      // Check model student
      const updateStudentModel = {
        name: req.body?.name || null,
        class: req.body?.class || null,
        school: req.body?.school || null,
        phoneNumber: req.body?.phoneNumber || null,
        shift: req.body?.shift || null,
      };
      for (var key in updateStudentModel) {
        if (!updateStudentModel[key]) {
          delete updateStudentModel[key];
        }
      }

      // save new data
      const responseUpdateStudent = await StudentList.findOneAndUpdate(
        { _id: req.params.id },
        updateStudentModel
      );
      // if having update shift ==> update in table payment
      if (updateStudentModel?.shift) {
        await Payment.findOneAndUpdate(
          { idStudent: responseUpdateStudent.idStudent },
          {
            shift: updateStudentModel.shift,
          }
        );
      }
      res.json("Update OK");
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }

  // 5. [Delete] /delete
  async delete(req, res, next) {
    try {
      await Promise.all([
        StudentList.delete({ idStudent: req.params.id }),
        Payment.delete({ idStudent: req.params.id }),
      ]);
      res.json("Delete OK");
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }
}

module.exports = new StudentController();
