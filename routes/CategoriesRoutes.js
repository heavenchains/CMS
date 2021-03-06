const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

router.get("/", (req, res) => {
  Category.find({})
    .then(categories => res.json(categories))
    .catch(err => res.json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  const id = req.body.id;
  Category.findOne({ _id: id })
    .then(category => res.json(category))
    .catch(err => res.json({ error: err.message }));
});

router.post("/create", (req, res) => {
  if (!req.body.name) res.json("Please enter a category name to continue");
  let newCategory = new Category({
    name: req.body.name
  });

  newCategory
    .save()
    .then(category => res.json(category))
    .catch(err => res.json({ error: err.message }));
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Category.findOne({ _id: id })
    .then(category => res.json(category))
    .catch(err => res.json({ error: err.message }));
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  if (!req.body.name) res.json("Please enter a category name to continue");
  Category.findOne({ _id: id })
    .then(category => {
      category.name = req.body.name;
      category
        .save()
        .then(category => res.json(category))
        .catch(err => res.json({ error: err.message }));
    })
    .catch(err => res.json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Category.deleteOne({ _id: id })
    .then(res.json({ msg: "Category has been deleted successfully!" }))
    .catch(err => res.json({ error: err.message }));
});

module.exports = router;
