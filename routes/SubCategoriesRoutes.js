const express = require("express");
const router = express.Router();
const SubCategory = require("../models/SubCategory");

router.get("/", (req, res) => {
  SubCategory.find({})
    .then(subcategories => res.json(subcategories))
    .catch(err => res.json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  const id = req.body.id;
  SubCategory.findOne({ _id: id })
    .then(subCategory => res.json(subCategory))
    .catch(err => res.json({ error: err.message }));
});

router.post("/create", (req, res) => {
  if (!req.body.name) res.json("Please enter a sub category name to continue");
  let newSubCategory = new SubCategory({
    name: req.body.name
  });

  newSubCategory
    .save()
    .then(subCategory => res.json(subCategory))
    .catch(err => res.json({ error: err.message }));
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  SubCategory.findOne({ _id: id })
    .then(subCategory => res.json(subCategory))
    .catch(err => res.json({ error: err.message }));
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  if (!req.body.name) res.json("Please enter a sub category name to continue");
  SubCategory.findOne({ _id: id })
    .then(subCategory => {
      subCategory.name = req.body.name;
      subCategory
        .save()
        .then(subCategory => res.json(subCategory))
        .catch(err => res.json({ error: err.message }));
    })
    .catch(err => res.json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  SubCategory.deleteOne({ _id: id })
    .then(res.json({ msg: "Sub Category has been deleted successfully!" }))
    .catch(err => res.json({ error: err.message }));
});

module.exports = router;
