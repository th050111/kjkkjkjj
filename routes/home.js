const express = require("express");
const meal = require("../public/src/js/meal");

const Schedule = require("../models/schedule");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = { role: "admin-master" };
  next();
});

router.get("/getMeal", (req, res, next) => {
  if (req.query.year && req.query.month && req.query.day) {
    const dateJson = {
      //값들 가져오기
      year: parseInt(req.query.year),
      month: parseInt(req.query.month),
      date: parseInt(req.query.day),
    };
    if (meal.isOkDate(dateJson)) {
      console.log("ok");
      return res.json({ ...meal.getMealListAt(dateJson), error: null });
    }
  }
  console.log("ok");
  res.json({ ...meal.getTodayMealList(), error: "날짜 정보가 잘 못 됨" });
});

router.get("/getSchedule", async (req, res, next) => {
  const schedules = await Schedule.findAll({ order: [["date", "ASC"]] });

  res.json(schedules);
});

router.get("/", async (req, res) => {
  res.render("home/main", {
    title: "메인 홈페이지",
  });
});

module.exports = router;
