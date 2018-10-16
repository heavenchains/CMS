const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");

router.get("/", (req, res) => {
  Issue.find({}).then(issues => {
    res.status(200).json(issues);
  });
});

router.get("/:id", (req, res) => {
  const id = req.body.id;
  Issue.findOne({ _id: id })
    .then(issue => res.json(issue))
    .catch(err => res.json({ error: err.message }));
});

router.post("/create", (req, res) => {
  const newIssue = new Issue({
    date: req.body.date,
    published: req.body.published
  });
  Issue.addIssue(newIssue, (err, issue) => {
    if (err) res.json({ error: err.message });
    res.json(issue);
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Issue.findOne({ _id: id })
    .then(issue => {
      res.json(issue);
    })
    .catch(err => res.json({ error: err.message }));
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  Issue.findOne({ _id: id })
    .then(issue => {
      issue.date = req.body.date;
      issue.published = req.body.published;
      issue
        .save()
        .then(editedIssue => {
          res.json(editedIssue);
        })
        .catch(err => res.json({ error: err.message }));
    })
    .catch(err => res.json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Issue.deleteOne({ _id: id })
    .then(deleted => res.json({ msg: "Issue has been deleted successfully!" }))
    .catch(err => res.json({ error: err.message }));
});
module.exports = router;
