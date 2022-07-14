const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("board/main", {
    title: "메인 홈페이지",
  });
});

module.exports = router;
