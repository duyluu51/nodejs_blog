const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const MonthPayment = new Schema(
  {
    cashAmount: { type: Number },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const Payment = new Schema(
  {
    idStudent: { type: String, required: true, index: true, unique: true },
    shift: { type: String, required: true },
    note: { type: String },
    jan: MonthPayment,
    feb: MonthPayment,
    mar: MonthPayment,
    apr: MonthPayment,
    may: MonthPayment,
    jun: MonthPayment,
    jul: MonthPayment,
    aug: MonthPayment,
    sep: MonthPayment,
    oct: MonthPayment,
    nov: MonthPayment,
    dec: MonthPayment,
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);
Payment.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("Payment", Payment);
