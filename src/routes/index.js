const studentRoutes = require("./studentRoutes");
const courseRoutes = require("./courseRoutes");
const authRoutes = require("./authRoutes");

function route(app) {
  app.use("/student", studentRoutes);
  app.use("/course", courseRoutes);
  app.use("/auth", authRoutes);
}

module.exports = route;
