const uuid = require("uuid/v4");

const bookmarks = [
  {
    id: 1,
    title: "hello",
    url: "https://google.com",
    description: "google",
    rating: 5
  },
  {
    id: 2,
    title: "bye",
    url: "https://yahoo.com",
    description: "yahoo",
    rating: 1
  }
];

module.exports = { bookmarks };
