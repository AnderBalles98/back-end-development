var express = require('express');
var router = express.Router();
const userController = require("../controllers/users");

/* GET users listing. */

router.get("/", userController.list);
router.get("/create", userController.createUser_get);
router.post("/create", userController.createUser);
router.post("/remove/:id", userController.remove);
router.get("/update/:id", userController.update_get);
router.post("/update/:id", userController.update);

module.exports = router;
