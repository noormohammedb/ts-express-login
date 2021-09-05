var express = require("express");
var router = express.Router();
const db = require("../utils/db-connection").db;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Login" });
});

router.get("/login", function (req, res, next) {
  res.render("index", { title: "Login" });
});

router.get("/signup", function (req, res) {
  const hbsObj = {
    title: "signup",
    link: "login",
  };
  res.render("signup", hbsObj);
});

router.post("/login-submission", (req, res) => {
  console.log("login submission");
  console.log(req.body);
  res.json({ message: "login-submission" });
});

router.post("/signup-submission", async (req, res) => {
  console.log("signup submission");
  console.log(req.body);
  try {
    const user = await db
      .collection("user")
      .findOne({ user_name: req.body.user_name });
    console.info("user:", user);
    if (user) {
      res.json({ message: "signup user exist" });
      console.log("user exist in db");
    } else {
      await db.collection("user").insertOne(req.body);
      console.log("db insertion done");
      res.json({ message: "signup success" });
    }
  } catch (error) {
    console.log("error in signup db operation");
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }

  // res.json({ message: "signup-submission" });
});

module.exports = router;
