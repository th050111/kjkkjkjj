const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const Schedule = require("../models/schedule");

const router = express.Router();

router.get("/login", isNotLoggedIn, async (req, res) => {
  res.render("user/login", {
    title: "로그인 페이지",
  });
});
router.get("/register", isNotLoggedIn, (req, res) => {
  res.render("user/register", {
    title: "회원가입 홈페이지",
  });
});

router.get("/", (req, res) => {
  res.redirect("user/login");
});

module.exports = router;
