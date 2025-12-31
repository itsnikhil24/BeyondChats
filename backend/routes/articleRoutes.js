const express = require("express");
const router = express.Router();
const controller = require("../controllers/articleController");

router.post("/scrape/beyondchats", controller.scrapeBeyondChats);
router.post("/rewrite/:id", controller.rewriteSingleArticle);
router.get("/", controller.getAllArticles);

module.exports = router;
