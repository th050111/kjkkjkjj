const express = require("express");
const Schedule = require("../models/schedule");

const router = express.Router();

router.post("/schedule/write", async (req, res) => {
  console.log(req.body);

  await Schedule.create({
    date: req.body.date,
    time: req.body.title,
    content: req.body.content || null,
    grade: req.body.grade,
    state: req.body.state || "official",
  });
  res.redirect("/admin/schedule");
});
router.post("/schedule/delete/:id", (req, res) => {
  Schedule.destroy({ where: { id: req.params.id } });
  res.json({});
});
router.get("/schedule", (req, res) => {
  res.render("admin/schedule", { title: "admin" });
});

router.get("/", (req, res) => {
  res.redirect("admin/schedule");
});

module.exports = router;
