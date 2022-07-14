exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  console.log(res.user);
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("already login");
    res.redirect(`/home?err=${message}`);
  }
};
