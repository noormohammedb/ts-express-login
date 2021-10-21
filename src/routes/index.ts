import express, { Application, Request, Response } from "express";
let router = express.Router();
import signupLogic from "../utils/signupLogic"
import loginLogic from "../utils/loginLogic"

/* GET home page. */
router.get("/", function (req: any, res: Response, next) {
  if (req.session?.data?.isLoggedin) {
    res.render("greeting", {
      title: "Login",
      username: req.session.data.username,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function (req: any, res: Response, next) {
  if (req.session?.data?.isLoggedin) {
    res.redirect("/");
  } else {
    res.render("index", { title: "Login" });
  }
});

router.get("/signup", function (req: any, res: Response) {
  const hbsObj = {
    title: "signup",
    link: "login",
  };
  if (req.session?.data?.isLoggedin) {
    res.redirect("/");
  } else {
    res.render("signup", hbsObj);
  }
});

router.get("/login-submission", (req, res) => {
  res.redirect("/login");
});
router.post("/login-submission", async (req: any, res: Response) => {
  console.log("login submission");
  console.log(req.body);
  const reqData = req.body;
  try {
    const response: any = await loginLogic(reqData);
    console.log(response);
    if (response.isLoggedin) {
      req.session.data = {
        isLoggedin: true,
        username: req.body.user_name,
      };
    }
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }
});

router.get("/signup-submission", (req, res) => {
  res.redirect("/signup");
});
router.post("/signup-submission", async (req, res) => {
  console.log("signup submission");
  console.log(req.body);
  try {
    const response = await signupLogic(req.body);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "internal server error" });
  }
});
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
        res.json({ status: "logout error" });
      } else {
        res.json({ status: "logged out" });
      }
    });
  } else {
    res.redirect("/login");
  }
});

export default router;
