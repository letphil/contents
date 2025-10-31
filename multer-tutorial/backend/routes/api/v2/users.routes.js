const { Router } = require("express");

const router = Router();

router.get("/{:id}", function (req, res) {
  res.send("GET USERS v2");
});

router.post("/", function (req, res) {
  res.send("CREATE USER v2");
});

router.put("/:id", function (req, res) {
  res.send("UPDATE USER v2");
});

router.delete("/:id", function (req, res) {
  res.send("DELETE USER v2");
});

module.exports = router;
