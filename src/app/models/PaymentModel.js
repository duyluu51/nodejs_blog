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
    year: { type: String, required: true },
    note: { type: String },
    jan1: MonthPayment,
    feb1: MonthPayment,
    mar1: MonthPayment,
    apr1: MonthPayment,
    may1: MonthPayment,
    jun1: MonthPayment,
    jul1: MonthPayment,
    aug1: MonthPayment,
    sep1: MonthPayment,
    oct1: MonthPayment,
    nov1: MonthPayment,
    dec1: MonthPayment,
    jan2: MonthPayment,
    feb2: MonthPayment,
    mar2: MonthPayment,
    apr2: MonthPayment,
    may2: MonthPayment,
    jun2: MonthPayment,
    jul2: MonthPayment,
    aug2: MonthPayment,
    sep2: MonthPayment,
    oct2: MonthPayment,
    nov2: MonthPayment,
    dec2: MonthPayment,
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
