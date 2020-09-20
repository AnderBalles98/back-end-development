var Component = require('../models/component');

exports.component_list = function(req, res) {
    res.render('components/index', {components: Component.allComponents});
}

exports.component_create_get = function(req, res) {
    res.render('components/create');
}

exports.component_create_post = function(req, res) {
    var newComponent = new Component(req.body.id, req.body.tipo, req.body.marca, req.body.frecuencia, [req.body.latitud, req.body.longitud]);
    Component.add(newComponent);
    res.redirect('/components');
}

exports.component_update_get = function (req, res) {
    var component = Component.findById(req.params.id);
    res.render('components/update', {component});
}

exports.component_update_post = function (req, res) {
    var component = Component.findById(req.params.id);
    component.id = req.body.id;
    component.tipo = req.body.tipo;
    component.marca = req.body.marca;
    component.frecuencia = req.body.frecuencia
    component.ubicacion = [req.body.latitud, re.body.longitud];
    res.redirect('/components');
}

exports.component_remove_post = function(req, res) {
    Component.removeById(req.body.id);
    res.redirect('/components');
}

