const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  order: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  }
});

module.exports = Role = mongoose.model("Role", RoleSchema);

module.exports.getRoleByName = (role, callback) => {
  const query = { role: role };
  Role.findOne(query, callback);
};
