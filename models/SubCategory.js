const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = SubCategory = mongoose.model("SubCategory", SubCategorySchema);
