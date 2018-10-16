const express = require("express");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

// normal requires
const { mongoURL } = require("./config/db");
const RolesRoutes = require("./routes/RolesRoutes");
const PermissionsRoutes = require("./routes/PermissionsRoutes");
const UsersRoutes = require("./routes/UsersRoutes");
const IssuesRoutes = require("./routes/IssuesRoutes");

const port = process.env.PORT || 3000;
const app = express();

// Mongoose connection
mongoose
  .connect(
    mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Mongodb is connected...");
  })
  .catch(err => console.log(err));

// static folder
const static = express.static(path.join(__dirname + "public"));
app.use(static);

// cors for api calls
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
// Routes
app.use("/api/roles", RolesRoutes);
app.use("/api/permissions", PermissionsRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/issues", IssuesRoutes);

// Server listen
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
