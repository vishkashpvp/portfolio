require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public", "images", "favicon.ico"))
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("pages/HomePage.ejs");
});

app.use("*", (req, res) => {
  res.status(404).send({
    response: "no such page",
    status: 404,
    "more@": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404",
  });
});

app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
