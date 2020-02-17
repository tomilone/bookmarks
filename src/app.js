require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const validateBearerToken = require("./validateBearerToken");
const { NODE_ENV } = require("./config");
const bookmarksRouter = require("./bookmarksRouter/bookmarksRouter");


const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use('/bookmarks',bookmarksRouter);

app.get("/", (req, res) => {
  res.send('hello world!')
});

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === "production") {
//     response = { error: { message: "server error" } };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });

module.exports = app;
