const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Student = new Schema(
  {
    idStudent: { type: String, required: true, index: true, unique: true },
    name: { type: String, required: true, unique: false },
    class: { type: String },
    school: { type: String },
    phoneNumber: { type: String },
    shift: { type: String, required: true },
    year: { type: String, required: true },
    passwordCheckInfo: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);
Student.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("Student", Student);
