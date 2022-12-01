const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

// config dotenv to read process.env
dotenv.config();

// Rounter
const route = require("./routes");

// Thiết lập file tĩnh
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// config cors
var whitelist = ["http://localhost:3000/", "http://localhost:5000/"];
var corsOptions = {
  origin: function (origin, callback) {
    // !!! will set up when deploy
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true);
    // } else {
    //   callback(new Error("Not allowed by CORS"));
    // }
    callback(null, true);
  },
};

app.use(cors(corsOptions));
app.use(methodOverride("_method"));
app.use(express.json());

// config body parse
//1. for parsing application/json
app.use(bodyParser.json());

//2. for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// end config body parse

app.get("/", (req, res) => {
  res.json({ sayHi: "Testing hello from server, nice to meet you!" });
});

// route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  // Thiết lập kết nối đến db
  const db = require("./config/db");
  // Connect to db
  db.connect();
});
