const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  index: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  published: {
    type: Boolean,
    default: false
  },
  categories: [
    {
      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        unique: true
      },
      categoryOrder: {
        type: Number
      },
      subCategories: [
        {
          subCategory: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
            unique: true
          },
          subCategoryOrder: {
            type: Number
          }
        }
      ]
    }
  ]
});

module.exports = Issue = mongoose.model("Issue", IssueSchema);

module.exports.addIssue = (issue, callback) => {
  Issue.find({}).then(issues => {
    issue.index = issues.length + 1;
    issue.save(callback);
  });
};
