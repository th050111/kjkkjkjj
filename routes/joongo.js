const express = require("express");
const User = require("../models/user");
const JgBoard = require("../models/board_jg");

const router = express.Router();

router.use("/board/view/:id", async (req, res, next) => {
  const boardId = req.params.id;
  const board = await JgBoard.findOne({ where: { id: boardId } });
  if (!board) {
    return res.render("joongo/error", { message: "해당 게시물이 없습니다" });
  }
  const writer = await User.findOne({ where: { id: board.UserId } });
  res.render("joongo/board", {
    board_title: board.title,
    board_writer: writer,
    board_content: board.content,
    board_onSale: board.onSale,
    title: "메인 홈페이지",
  });
});

router.get("/list", async (req, res, next) => {
  const list = await JgBoard.findAll({
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  });
  res.render("joongo/main", {
    title: "메인 홈페이지",
    list,
  });
});

router.get("/write", async (req, res, next) => {
  res.render("joongo/write", {
    title: "메인 홈페이지",
  });
});

router.get("/user/myboard", async (req, res, next) => {
  const boardList = await JgBoard.findAll({
    where: {
      UserId: req.user.id,
    },
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  });
  res.render("joongo/myboard", {
    title: "메인 홈페이지",
    boardList,
    userId: req.user.id,
  });
});

router.post("/user/change/onSale", async (req, res, next) => {
  const id = req.body.id;
  const type = req.body.type;

  await JgBoard.update(
    {
      onSale: type,
    },
    {
      where: { id: id },
    }
  );
  return res.redirect("/joongo/user/myboard");
});

router.post("/board/write", async (req, res, next) => {
  console.log(req.body);
  const money1 = req.body.money1 ? true : false;
  const money2 = req.body.money2 ? true : false;
  const money3 = req.body.money3 ? true : false;

  const money = {
    money1: {
      isTrue: money1,
      comment: req.body.money1,
    },

    money2: {
      isTrue: money2,
      comment: req.body.money2,
    },

    money2: {
      isTrue: money2,
      comment: req.body.money2,
    },
  };
  console.log(money);
  const { title, content } = req.body;
  const userId = req.user.id;
  await JgBoard.create({
    title,
    content,
    money,
    UserId: req.user.id,
  });
  return res.redirect("/joongo/list");
});

router.get("/user/get/myboard", async (req, res, next) => {
  const boardList = await JgBoard.findAll({
    where: {
      UserId: req.user.id,
    },
    include: {
      model: User,
      attributes: ["id", "nick"],
    },
    order: [["createdAt", "DESC"]],
  });
  console.log("hi");
  res.json({ boardList });
});
router.get("/", async (req, res) => {
  return res.redirect("/joongo/list");
});

module.exports = router;
