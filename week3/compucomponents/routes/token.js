var express = require("express");
var router = express.Router();

var tokenController = require("../controllers/tokenAPI");

router.get("/confirmation/:token", tokenController.confirmationGet);

module.exports = router;