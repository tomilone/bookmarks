const express = require("express");
const { bookmarks } = require("../store");
const uuid = require("uuid/v4");
const logger = require("../Logger");

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route("/bookmarks")
  .get((req, res) => {
    console.log("get /bookmarks worked");
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;
    if (!title) {
      logger.error(`Title is required`);
      return res.status(400).send("Invalid data");
    }
    if (!url) {
      logger.error(`url is required`);
      return res.status(400).send("Invalid data");
    }
    if (!description) {
      logger.error(`description is required`);
      return res.status(400).send("Invalid data");
    }
    if (!rating) {
      logger.error(`rating is required`);
      return res.status(400).send("Invalid data");
    }

    const id = uuid();

    const bookMark = {
      id,
      title,
      url,
      description,
      rating
    };
    bookmarks.push(bookMark);

    logger.info(`Bookmark with id${id} created.`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookMark);
  });

bookmarkRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    const { id } = req.params;
    const bookMark1 = bookmarks.find(bid => bid.id == id);
    console.log("get /bookmarks:id worked");
    if (!bookMark1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }

    res.json(bookMark1);
  })
  .delete((req, res) => {
    const { id } = req.params;
    bookMarkIndex = bookmarks.findIndex(bm => bm.id == id);
    if (bookMarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Not Found");
    }

    bookmarks.splice(bookMarkIndex, 1);
    logger.info(`Bookmark with id ${id} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarkRouter;
