const { Router } = require("express");

const router = Router();

router.get("/{:id}", function (req, res) {
  res.send("GET ADDRESSES");
});

router.post("/", function (req, res) {
  res.send("CREATE ADDRESSES");
});

router.put("/:id", function (req, res) {
  res.send("UPDATE ADDRESSES");
});

router.delete("/:id", function (req, res) {
  res.send("DELETE ADDRESSES");
});

module.exports = router;
