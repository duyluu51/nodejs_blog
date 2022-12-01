const studentRoutes = require("./studentRoutes");
const authRoutes = require("./authRoutes");

function route(app) {
  app.use("/student", studentRoutes);
  app.use("/auth", authRoutes);
  app.use("/users", studentRoutes);
}

module.exports = route;
