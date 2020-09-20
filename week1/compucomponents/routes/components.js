var express = require('express');
var router = express.Router();

var componentsController = require('../controllers/component');


// request
router.get('/', componentsController.component_list);
router.get('/create', componentsController.component_create_get);
router.post('/create', componentsController.component_create_post);
router.post('/remove/:id', componentsController.component_remove_post);
router.get('/update/:id', componentsController.component_update_get);
router.post('/update/:id', componentsController.component_update_post);

module.exports = router;
