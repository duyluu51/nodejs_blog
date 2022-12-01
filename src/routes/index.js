const studentRouter = require("./studentRouster");

function route(app) {
  app.use("/student", studentRouter);
}

module.exports = route;
