const studentRoutes = require("./studentRoutes");
const courseRoutes = require("./courseRoutes");
const authRoutes = require("./authRoutes");
const paymentRoutes = require("./paymentRoutes");

function route(app) {
  app.use("/student", studentRoutes);
  app.use("/course", courseRoutes);
  app.use("/auth", authRoutes);
  app.use("/payment", paymentRoutes);
}

module.exports = route;
