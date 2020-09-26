var Component = require('../../models/component');

exports.component_list = function(req, res) {
    Component.allComponents(function(error, allComponents) {
        res.status(200).json({
            components: allComponents
        });
    });
}

exports.component_create = function(req, res) {
    var data = req.body;
    var newComponent = Component.createInstance(data.code, data.tipo, data.marca, data.frecuencia, [data.latitud, data.longitud]);
    Component.add(newComponent, function(error, success) {
        // console.log("------");
        // console.log(success);
        // console.log("------");
        res.status(200).json({
            newComponent
        });
    });
}

exports.component_remove = function(req, res) {
    const data = req.body;
    const params = req.params;
    Component.removeByCode(params.code, function(error, success) {
        if(success.n > 0) {
            res.status(200).json();
        }else {
            res.status(404).json();
        }
    });
}

exports.component_update = function(req, res) {
    const data = req.body;
    const params = req.params;
    var newComponent = req.body;
    Component.updateByCode(params.code, newComponent, function(error, success) {
        if (success.n > 0) {
            res.status(200).json({
                newComponent
            });
        }else {
            res.status(404).json();
        }
    })
}