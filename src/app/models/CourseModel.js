const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    shiftCode: { type: String, required: true },
    nameShift: { type: String, required: true },
    year: { type: String, required: true },
    timeContent: { type: [String], required: true } ,
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("shifts", Course);
