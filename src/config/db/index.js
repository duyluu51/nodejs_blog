const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://STUDENT_LIST:1@cluster0.ksdtsc0.mongodb.net/STUDENT"
    );
    console.log("Mongodb connect successfully");
  } catch (error) {
    console.log("Mongodb connect failure");
  }
}

module.exports = { connect };
