var Component = require('../../models/component');

exports.component_list = function(req, res) {
    res.status(200).json({
        components: Component.allComponents
    });
}

exports.component_create = function(req, res) {
    var data = req.body;
    var newComponent = new Component(data.id, data.tipo, data.marca, data.frecuencia, [data.latitud, data.longitud]);
    Component.add(newComponent);
    res.status(200).json({
        newComponent
    });
}

exports.component_remove = function(req, res) {
    var data = req.body;
    Component.removeById(data.id);
    res.status(204).send(); // el código 204 significa que va vacio.
}

exports.component_update = function(req, res) {
    var data = req.body;
    var params = req.params;
    var currentComponent = Component.findById(params.id);
    var oldComponent = Object.assign({}, currentComponent);
    currentComponent.id = data.id;
    currentComponent.tipo = data.tipo;
    currentComponent.marca = data.marca;
    currentComponent.frecuencia = data.frecuencia;
    currentComponent.ubicacion = [data.latitud, data.longitud];
    Component.add(currentComponent);
    res.status(200).json({
        oldComponent,
        currentComponent
    });
}