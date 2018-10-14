const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermissionSchema = new Schema({
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role"
  },
  roleOrder: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: ["String"]
  }
});

module.exports = Permission = mongoose.model("Permission", PermissionSchema);

module.exports.getPermissionById = (roleId, callback) => {
  const query = { role: role };
  Permission.findOne(query, callback);
};
