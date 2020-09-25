var Component = function(id, tipo, marca, frecuencia, ubicacion) {
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.frecuencia = frecuencia;
    this.ubicacion = ubicacion;
}

Component.prototype.toString = function() {
    return 'id: ' + this.id + '| tipo: ' + this.tipo;
}

Component.allComponents = [];
Component.add = function(newComponent) {
    this.allComponents.push(newComponent);
}

Component.findById = function (component_id) {
    var component = this.allComponents.find(x => x.id == component_id);
    if (component) {
        return component;
    }
    return new Error(`${component_id} doesn't exists`);
}

Component.removeById = function (component_id) {
    for (var i = 0; i < this.allComponents.length; i++) {
        var component = this.allComponents[i];
        console.log(component_id)
        if (component_id == component.id) {
            this.allComponents.splice(i, 1); // remove component
            return true;
        }
    }
    return new Error(`${component_id} doesn't exists`);
}

Component.add(new Component(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]));
Component.add(new Component(2, "CPU", "Intel", 3.8, [4.6482838, -74.2479]));

module.exports = Component;