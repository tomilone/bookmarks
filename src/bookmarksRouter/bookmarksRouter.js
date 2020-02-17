const express = require("express");
const { bookmarks } = require("../store");
const uuid = require("uuid/v4");
const logger = require("../Logger");

const bookmarkRouter = express.Router();
const bodyParser = express.json();
const { NODE_ENV } = require("../config");
const bookmarksService = require('./bookmarksService')
const knex = require('knex');

// const serializeBookmark = bookmark => ({
//   id: bookmark.id,
//   title: bookmark.title,
//   url: bookmark.url,
//   description: bookmark.description,
//   rating: Number(bookmark.rating),
// })

const knexInstance =  knex({
  client: 'pg',
  connection: process.env.DB_URL
})


bookmarkRouter
  .route('/')
  .get((req, res, next) => {
    bookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks)
      })
      .catch(next)
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
    const bookMark = bookmarks.find(bid => bid.id == id);
    if (!bookMark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }

    res.json(bookMark);
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
