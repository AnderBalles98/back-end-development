var express = require("express");
var router = express.Router();
var userControlerAPI = require("../../controllers/api/usersControlletAPI");

router.get("/", userControlerAPI.user_list);
router.post("/create", userControlerAPI.user_create);
router.post("/booking/:id", userControlerAPI.user_booking);

module.exports = router;