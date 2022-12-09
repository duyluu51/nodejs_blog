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
    try {
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
        let monthItem=paymentItem[0]
        res.json({ monthItem });
      })
      .catch(next);
    }catch(error){
      res.status(400).send("Bad Request");
    }
  }

  // 3. [put] /updatePayment
  async updatePayment(req, res, next) {
    try {
      // Check model payment
      const updatePaymentModel = {
        shift: req.body?.shift || null,
        note: req.body?.note || null,
        jan1: req.body?.jan1
          ? {
              cashAmount: req.body?.jan1?.cashAmount || 0,
              note: req.body?.jan1?.note || "",
            }
          : null,
        feb1: req.body?.feb1
          ? {
              cashAmount: req.body?.feb1?.cashAmount || 0,
              note: req.body?.feb1?.note || "",
            }
          : null,
        mar1: req.body?.mar1
          ? {
              cashAmount: req.body?.mar1?.cashAmount || 0,
              note: req.body?.mar1?.note || "",
            }
          : null,
        apr1: req.body?.apr1
          ? {
              cashAmount: req.body?.apr1?.cashAmount || 0,
              note: req.body?.apr1?.note || "",
            }
          : null,
        may1: req.body?.may1
          ? {
              cashAmount: req.body?.may1?.cashAmount || 0,
              note: req.body?.may1?.note || "",
            }
          : null,
        jun1: req.body?.jun1
          ? {
              cashAmount: req.body?.jun1?.cashAmount || 0,
              note: req.body?.jun1?.note || "",
            }
          : null,
        jul1: req.body?.jul1
          ? {
              cashAmount: req.body?.jul1?.cashAmount || 0,
              note: req.body?.jul1?.note || "",
            }
          : null,
        aug1: req.body?.aug1
          ? {
              cashAmount: req.body?.aug1?.cashAmount || 0,
              note: req.body?.aug1?.note || "",
            }
          : null,
        sep1: req.body?.sep1
          ? {
              cashAmount: req.body?.sep1?.cashAmount || 0,
              note: req.body?.sep1?.note || "",
            }
          : null,
        oct1: req.body?.oct1
          ? {
              cashAmount: req.body?.oct1?.cashAmount || 0,
              note: req.body?.oct1?.note || "",
            }
          : null,
        nov1: req.body?.nov1
          ? {
              cashAmount: req.body?.nov1?.cashAmount || 0,
              note: req.body?.nov1?.note || "",
            }
          : null,
        dec1: req.body?.dec1
          ? {
              cashAmount: req.body?.dec1?.cashAmount || 0,
              note: req.body?.dec1?.note || "",
            }
          : null,
        jan2: req.body?.jan2
          ? {
              cashAmount: req.body?.jan2?.cashAmount || 0,
              note: req.body?.jan2?.note || "",
            }
          : null,
        feb2: req.body?.feb2
          ? {
              cashAmount: req.body?.feb2?.cashAmount || 0,
              note: req.body?.feb2?.note || "",
            }
          : null,
        mar2: req.body?.mar2
          ? {
              cashAmount: req.body?.mar2?.cashAmount || 0,
              note: req.body?.mar2?.note || "",
            }
          : null,
        apr2: req.body?.apr2
          ? {
              cashAmount: req.body?.apr2?.cashAmount || 0,
              note: req.body?.apr2?.note || "",
            }
          : null,
        may2: req.body?.may2
          ? {
              cashAmount: req.body?.may2?.cashAmount || 0,
              note: req.body?.may2?.note || "",
            }
          : null,
        jun2: req.body?.jun2
          ? {
              cashAmount: req.body?.jun2?.cashAmount || 0,
              note: req.body?.jun2?.note || "",
            }
          : null,
        jul2: req.body?.jul2
          ? {
              cashAmount: req.body?.jul2?.cashAmount || 0,
              note: req.body?.jul2?.note || "",
            }
          : null,
        aug2: req.body?.aug2
          ? {
              cashAmount: req.body?.aug2?.cashAmount || 0,
              note: req.body?.aug2?.note || "",
            }
          : null,
        sep2: req.body?.sep2
          ? {
              cashAmount: req.body?.sep2?.cashAmount || 0,
              note: req.body?.sep2?.note || "",
            }
          : null,
        oct2: req.body?.oct2
          ? {
              cashAmount: req.body?.oct2?.cashAmount || 0,
              note: req.body?.oct2?.note || "",
            }
          : null,
        nov2: req.body?.nov2
          ? {
              cashAmount: req.body?.nov2?.cashAmount || 0,
              note: req.body?.nov2?.note || "",
            }
          : null,
        dec2: req.body?.dec2
          ? {
              cashAmount: req.body?.dec2?.cashAmount || 0,
              note: req.body?.dec2?.note || "",
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
