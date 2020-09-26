var Component = require('../models/component');

exports.component_list = function(req, res) {
    Component.allComponents(function(error, allComponents) {
        res.render('components/index', {components: allComponents});
    });
}

exports.component_create_get = function(req, res) {
    res.render('components/create');
}

exports.component_create_post = function(req, res) {
    var newComponent = Component.createInstance(req.body.code, req.body.tipo, req.body.marca, req.body.frecuencia, [req.body.latitud, req.body.longitud]);
    Component.add(newComponent, function(error, success) {
        res.redirect('/components');
    });
}

exports.component_update_get = function (req, res) {
    const params = req.params;
    Component.findByCode(params.code, function(error, component) {
        res.render('components/update', {component});
    });
}


exports.component_update_post = function (req, res) {
    const data = req.body;
    var newComponent = {
        code: data.code,
        tipo: data.tipo,
        marca: data.marca,
        frecuencia: data.frecuencia,
        ubicacion: [data.latitud, data.longitud]
    }
    Component.updateByCode(req.params.code, newComponent, function(error, success) {
        res.redirect('/components');
    }) 
}

exports.component_remove_post = function(req, res) {
    Component.removeByCode(req.body.code, function(error, success){
        res.redirect('/components');
    });
}

