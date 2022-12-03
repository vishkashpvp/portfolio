require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", (req, res) => {
  res.render("pages/HomePage.ejs");
});

app.listen(PORT, () => {
  console.log(`express server listening on port ${PORT}`);
});
