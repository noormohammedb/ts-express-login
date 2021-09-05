var express = require("express");
var router = express.Router();
const singupLogic = require("../utils/singupLogic");
const loginLogic = require("../utils/loginLogic");

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

router.post("/login-submission", async (req, res) => {
  console.log("login submission");
  console.log(req.body);
  const reqData = req.body;
  try {
    const response = await loginLogic(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }
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
});

module.exports = router;
