const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "roles"
  },
  permissions: {
    type: Schema.Types.ObjectId,
    ref: "permissions"
  }
});

module.exports = User = mongoose.model("User", UserSchema);

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.getUserByUsername = (username, callback) => {
  const query = { username: username };
  User.findOne(query, callback);
};
module.exports.getUserByEmail = (email, callback) => {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      // Store hash in your password DB.
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = (userPassword, hash, callback) => {
  bcrypt.compare(userPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
