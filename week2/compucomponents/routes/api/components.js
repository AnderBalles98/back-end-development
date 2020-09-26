var express = require('express');
var router = express.Router();

var componentsController = require('../../controllers/api/componentsControllerAPI');

router.get('/', componentsController.component_list);
router.post('/create', componentsController.component_create);
router.delete('/remove/:code', componentsController.component_remove);
router.post('/update/:code', componentsController.component_update);

module.exports = router;