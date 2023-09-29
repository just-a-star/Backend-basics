const path = require("path");

const express = require("express");
const router = express.Router();

const rootDir = require("../util/path");

// /admin/add-product
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
// router.post('/add-produict' (req, res, next) => {
//   console.log(req.body);
//   res.redirect
// })
// these lines of code below will also execute the incoming get request, use app.post or .get

// /admin/product
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
