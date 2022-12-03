const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const Student = new Schema(
  {
    name: { type: String, required: true },
    class: { type: String},
    school: { type: String},
    phoneNumber: { type: String},
    shift: { type: String, required: true },
    year: { type: String, required: true },
    idStudent: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);
// Product.plugin(mongooseDelete, {
//   overrideMethods: true ,
//   deletedAt : true,
// })

module.exports = mongoose.model("Student", Student);
