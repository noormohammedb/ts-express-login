var express = require("express");
var router = express.Router();

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

module.exports = router;
