const express = require("express");
const router = express.Router();
const News = require("../models/News");

// get all news

router.get("/", (req, res) => {
  News.find({})
    .populate({
      path: "createdBy",
      select: "username email avatar _id role permissions",
      populate: { path: "role permissions" }
    })
    .populate("issue progress category subCategory")
    .then(allNews => res.json(allNews))
    .catch(err => res.json({ error: err.message }));
});

// get single news by ID

router.get("/:id", (req, res) => {
  const id = req.params.id;
  News.find({ _id: id })
    .populate({
      path: "createdBy",
      select: "username email avatar _id role permissions",
      populate: { path: "role" },
      populate: { path: "permissions" }
    })
    .populate("issue progress category subCategory")
    .then(singleNews => res.json(singleNews))
    .catch(err => res.json({ error: err.message }));
});

// add news

router.post("/create", (req, res) => {
  const newNews = new News({
    title: req.body.title,
    content: req.body.content,
    isMain: req.body.isMain,
    newsTitle: req.body.newsTitle,
    image: req.body.image,
    imageAlign: req.body.imageAlign,
    published: req.body.status,
    createdBy: req.body.createdBy,
    issue: req.body.issue,
    progress: req.body.progress,
    category: req.body.category,
    subCategory: req.body.subCategory,
    newsOrder: req.body.newsOrder
  });
  newNews
    .save()
    .then(addedNews => res.json(addedNews))
    .catch(err => res.json({ error: err.message }));
});

// update news by ID

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  News.findOne({ _id: id }).then(singleNews => {
    singleNews.title = req.body.title;
    singleNews.content = req.body.content;
    singleNews.isMain = req.body.isMain;
    singleNews.image = req.body.image;
    singleNews.imageAlign = req.body.imageAlign;
    singleNews.published = req.body.published;
    singleNews.createdBy = req.body.createdBy;
    singleNews.issue = req.body.issue;
    singleNews.progress = req.body.progress;
    singleNews.category = req.body.category;
    singleNews.subCategory = req.body.subCategory;
    singleNews.newsOrder = req.body.newsOrder;

    singleNews
      .save()
      .then(data => res.json(data))
      .catch(err => res.json({ error: err.message }));
  });
});

// delete news by ID

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  News.deleteOne({ _id: id })
    .then(res.json({ msg: "News has been deleted successfully!" }))
    .catch(err => res.json({ error: err.message }));
});

// get all news that has title

router.get("/newsTitles", (req, res) => {
  News.find({}).populate();
});

module.exports = router;
