const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Student = new Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  school: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shift: { type: String, required: true },
  year: { type: String, required: true },
  idStudent: { type: String, required: true },
});

// Add plugin
mongoose.plugin(slug);
// Product.plugin(mongooseDelete, {
//   overrideMethods: true ,
//   deletedAt : true,
// })

module.exports = mongoose.model("Student", Student);
