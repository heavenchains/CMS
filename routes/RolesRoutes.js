const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

router.get("/", (req, res) => {
  Role.find({}).then(roles => {
    res.json(roles);
  });
});

router.get("/:id", (req, res) => {
  const id = req.body.id;
  Role.findOne({ _id: id })
    .then(role => res.json(role))
    .catch(err => res.json({ error: err.message }));
});

router.post("/create", (req, res) => {
  Role.getRoleByName(req.body.role, (err, role) => {
    if (err) res.json({ error: err.message });

    if (!role) {
      if (req.body.role && req.body.order) {
        let newRole = new Role({
          role: req.body.role,
          order: req.body.order,
          admin: req.body.admin
        });

        newRole
          .save()
          .then(role => {
            res.json({
              Success: true,
              msg: "Role has been entered successfully",
              role: role
            });
          })
          .catch(err => {
            res.json({
              Success: false,
              msg: "Something went wrong",
              error: err.message
            });
          });
      } else {
        res.send({
          Success: false,
          msg: "Invalid entries"
        });
      }
    } else {
      res.send({
        msg: `There is a role exists with the same name (${req.body.role})`
      });
    }
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Role.findOne({ _id: id })
    .then(role => {
      res.send(role);
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  Role.findOne({ _id: id })
    .then(role => {
      if (req.body.role && req.body.order) {
        role.role = req.body.role;
        role.order = req.body.order;
        role.admin = req.body.admin;

        role.save().then(savedRole => {
          res.send({
            Success: true,
            msg: "Role has been updated successfully",
            role: savedRole
          });
        });
      } else {
        res.send({
          Success: false,
          msg: "Invalid entries"
        });
      }
    })
    .catch(err => {
      res.send({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Role.deleteOne({ _id: id })
    .then(role => {
      res.send({ msg: "Role has been deleted successfully!" });
    })
    .catch(err => res.send({ error: err.message }));
});

module.exports = router;
