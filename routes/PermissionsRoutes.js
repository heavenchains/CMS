const express = require("express");
const router = express.Router();
const Permission = require("../models/Permission");

router.get("/", (req, res) => {
  Permission.find({})
    .populate("role")
    .then(permissions => {
      res.json(permissions);
    });
});

router.post("/create", (req, res) => {
  Permission.getPermissionById(req.body.role, (err, permission) => {
    if (err) res.json({ error: err.message });
    if (!permission) {
      if (req.body.role && req.body.permissions) {
        let newPermission = new Permission({
          role: req.body.role,
          permissions: req.body.permissions,
          roleOrder: req.body.roleOrder
        });

        newPermission
          .save()
          .then(permission => {
            res.json({
              Success: true,
              msg: "Permissions have been entered successfully",
              permission: permission
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
      res.json({ msg: "Permissions alreay exist to this role id" });
    }
  });
});

router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  Permission.findOne({ _id: id })
    .then(permission => {
      res.json(permission);
    })
    .catch(err => res.json({ error: err.message }));
});

router.put("/edit/:id", (req, res) => {
  const id = req.params.id;
  Permission.findOne({ _id: id }).then(permission => {
    if (req.body.role && req.body.permissions) {
      permission.role = req.body.role;
      permission.permissions = req.body.permissions;
      permission.roleOrder = req.body.roleOrder;

      permission
        .save()
        .then(permission => {
          res.json({
            msg: "Permissions have been updated successfully"
          });
        })
        .catch(err => {
          res.json({ error: err.message });
        });
    } else {
      res.json({
        Success: false,
        msg: "Invalid entries"
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Permission.deleteOne({ _id: id })
    .then(() => {
      res.json({ msg: "Permissions have been deleted successfully!" });
    })
    .catch(err => res.json({ error: err.message }));
});

module.exports = router;
