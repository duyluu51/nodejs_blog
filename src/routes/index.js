const studentRoutes = require("./studentRoutes");
const authRoutes = require("./authRoutes");

function route(app) {
  app.use("/student", studentRoutes);
  app.use("/auth", authRoutes);
}

module.exports = route;
