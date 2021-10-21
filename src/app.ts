import createError from "http-errors";
import express, { Application, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import morgan from "morgan";
import morgan from "morgan";
import session from "express-session";


const dbutil = require("./utils/db-connection");
dbutil.dbconnect().then(() => {
  console.log("db connected");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 60000 },
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
