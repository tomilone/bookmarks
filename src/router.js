const express = require("express");
const { bookmarks } = require("../src/store");

const bookmarkRouter = express.Router();
const respJSON = express.json();

bookmarkRouter.route("/bookmarks").get((req, res) => {
  res.json(bookmarks);
});

module.exports = router;
