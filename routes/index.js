var express = require("express");
var router = express.Router();
// const db = require("../utils/db-connection").db;
const singupLogic = require("../utils/singupLogic");

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
    const response = await singupLogic(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }

  // res.json({ message: "signup-submission" });
});

module.exports = router;
