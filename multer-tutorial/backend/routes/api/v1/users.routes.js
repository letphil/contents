const { Router } = require("express");

const { usersController } = require("../../../controllers/index.js");

const router = Router();

router.get("/{:id}", async function (req, res) {
  if ("id" in req.params) {
    return res.send(await usersController.getUserById(req.params.id));
  }

  res.send(await usersController.getUsersList());
});

router.post("/", function (req, res) {
  res.send("CREATE USER");
});

router.put("/:id", function (req, res) {
  res.send("UPDATE USER");
});

router.delete("/:id", function (req, res) {
  res.send("DELETE USER");
});

module.exports = router;
