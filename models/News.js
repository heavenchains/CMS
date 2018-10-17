const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isMain: {
    type: Boolean,
    default: false
  },
  newsTitle: {
    hasTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    titleOrder: {
      type: Number,
      default: 0
    }
  },
  image: {
    type: String
  },
  imageAlign: {
    type: String,
    default: "fullwidth"
  },
  published: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue"
  },
  progress: {
    type: Schema.Types.ObjectId,
    ref: "Role"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory"
  },
  newsOrder: {
    type: Number,
    default: 0
  },
  categoryNewsOrder: {
    type: Number,
    default: 0
  },
  subCategoryNewsOrder: {
    type: Number,
    default: 0
  }
});

module.exports = News = mongoose.model("News", NewsSchema);
