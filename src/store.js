const uuid = require("uuid/v4");

const bookmarks = [
  {
    id: 1,
    title: "hello",
    url: "https://google.com",
    desciption: "google",
    rating: 5
  },
  {
    id: 2,
    title: "bye",
    url: "https://yahoo.com",
    desciption: "yahoo",
    rating: 1
  }
];

module.exports = { bookmarks };
