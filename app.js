const express = require("express");
const connectDb = require("./database");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./api/users/users.routes");
const profileRoutes = require("./api/profiles/profiles.routes");
const sessionRoutes = require("./api/sessions/sessions.routes");

connectDb();
const app = express();

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/sessions", sessionRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

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
