const PaymentList = require("../models/PaymentModel");
const StudentList = require("../models/StudentModel");

class paymentController {
  // 1. [GET] /getPayment
  getPayment(req, res, next) {
    // handle param
    let modelParam = {
      idStudent: req.query?.idStudent || null,
      shift: req.query?.shift || null,
    };
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
    console.log(modelParam);
    // End handle param
    PaymentList.find(modelParam)
      .then((paymentItem) => {
        res.json({ paymentItem });
      })
      .catch(next);
  }
  // 2. [GET] /getPaymentbyStudent
  async getPaymentByStudent(req, res, next) {
    // handle param
    let modelParam = {
      idStudent: req.query?.idStudent || null,
      password: req.query?.password || null,
    };
    for (var key in modelParam) {
      if (!modelParam[key]) {
        delete modelParam[key];
      }
    }
    // End handle param

    // Validation
    // 1.
    const userList = await StudentList.find({
      idStudent: modelParam?.idStudent,
    });
    if (userList.length === 0) {
      return res.status(401).send("Tên đăng nhập không tồn tại.");
    }
    // 2.
    if (userList[0].passwordCheckInfo !== modelParam?.password) {
      return res.status(401).send("Sai Mật khẩu");
    }
    // ---End Validation
    PaymentList.find({
      idStudent: modelParam?.idStudent,
    })
      .then((paymentItem) => {
        res.json({ paymentItem });
      })
      .catch(next);
  }

  // 3. [put] /updatePayment
  async updatePayment(req, res, next) {
    try {
      // Check model payment
      const updatePaymentModel = {
        shift: req.body?.shift || null,
        note: req.body?.note || null,
        jan: req.body?.jan
          ? {
              cashAmount: req.body?.jan?.cashAmount || 0,
              note: req.body?.jan?.note || "",
            }
          : null,
        feb: req.body?.feb
          ? {
              cashAmount: req.body?.feb?.cashAmount || 0,
              note: req.body?.feb?.note || "",
            }
          : null,
        mar: req.body?.mar
          ? {
              cashAmount: req.body?.mar?.cashAmount || 0,
              note: req.body?.mar?.note || "",
            }
          : null,
        apr: req.body?.apr
          ? {
              cashAmount: req.body?.apr?.cashAmount || 0,
              note: req.body?.apr?.note || "",
            }
          : null,
        may: req.body?.may
          ? {
              cashAmount: req.body?.may?.cashAmount || 0,
              note: req.body?.may?.note || "",
            }
          : null,
        jun: req.body?.jun
          ? {
              cashAmount: req.body?.jun?.cashAmount || 0,
              note: req.body?.jun?.note || "",
            }
          : null,
        jul: req.body?.jul
          ? {
              cashAmount: req.body?.jul?.cashAmount || 0,
              note: req.body?.jul?.note || "",
            }
          : null,
        aug: req.body?.aug
          ? {
              cashAmount: req.body?.aug?.cashAmount || 0,
              note: req.body?.aug?.note || "",
            }
          : null,
        sep: req.body?.sep
          ? {
              cashAmount: req.body?.sep?.cashAmount || 0,
              note: req.body?.sep?.note || "",
            }
          : null,
        oct: req.body?.oct
          ? {
              cashAmount: req.body?.oct?.cashAmount || 0,
              note: req.body?.oct?.note || "",
            }
          : null,
        nov: req.body?.nov
          ? {
              cashAmount: req.body?.nov?.cashAmount || 0,
              note: req.body?.nov?.note || "",
            }
          : null,
        dec: req.body?.dec
          ? {
              cashAmount: req.body?.dec?.cashAmount || 0,
              note: req.body?.dec?.note || "",
            }
          : null,
      };
      for (var key in updatePaymentModel) {
        if (!updatePaymentModel[key]) {
          delete updatePaymentModel[key];
        }
      }
      // save new data
      await PaymentList.findOneAndUpdate(
        { idStudent: req.params.id },
        updatePaymentModel
      );
      console.log("update data success");
      res.json("OK");
    } catch (error) {
      res.status(400).send("Bad Request");
    }
  }
}

module.exports = new paymentController();
