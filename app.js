const express = require("express");
const connectDb = require("./database");

const passport = require("passport");
const path = require("path");

const cors = require("cors");
const app = express();

connectDb();

app.use(passport.initialize());

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});
app.listen(8090, () => {
  console.log("The application is running on localhost:8090");
});
