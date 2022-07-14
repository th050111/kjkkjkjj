const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/register", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password, repassword } = req.body;
  console.log(req.body);
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/user/register?error=exist");
    }
    if (password !== repassword) {
      return res.redirect("/user/register?error=notPair");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/user/login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  console.log("login!!");
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/user/login?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

// router.get("/logout", isLoggedIn, (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
//   req.session.destroy();
//   res.redirect("/");
// });

module.exports = router;
