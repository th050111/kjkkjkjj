const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config(); //env파일
const homeRouter = require("./routes/home");
const boardRouter = require("./routes/board.js");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const joongoRouter = require("./routes/joongo");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");
const passportConfig = require("./passport");
const { isNotLoggedIn, isLoggedIn } = require("./routes/middlewares");

const siteList = [
  {
    name: "main",
    img: "hihi",
    url: "home",
  },
  {
    name: "board",
    img: "hihi",
    url: "board",
  },
];

const app = express();
passportConfig();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

console.log(process.env.COOKIE_SECRET);
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.siteList = siteList;
  next();
});
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/home", isLoggedIn, homeRouter);
app.use("/joongo", isLoggedIn, joongoRouter);
app.use("/board", boardRouter);
app.use("/admin", adminRouter);
app.use("/", (req, res) => {
  return res.redirect("/home");
});

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "포트에서 대기중");
});
