const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  published: {
    type: Boolean,
    defualt: false
  }
});

module.exports = Issue = mongoose.model("Issue", IssueSchema);
