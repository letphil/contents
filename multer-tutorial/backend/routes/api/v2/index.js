const { Router } = require("express");

const users = require("./users.routes.js");
// const addresses = require("./addresses.routes.js");

const router = Router();

router.use("/users", users);
// router.use("/addresses", addresses);

module.exports = router;
