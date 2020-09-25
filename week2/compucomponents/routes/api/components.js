var express = require('express');
var router = express.Router();

var componentsController = require('../../controllers/api/componentsControllerAPI');

router.get('/', componentsController.component_list);
router.post('/create', componentsController.component_create);
router.delete('/remove', componentsController.component_remove);
router.post('/update/:id', componentsController.component_update);

module.exports = router;