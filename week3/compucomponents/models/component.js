var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var componentSchema = new Schema({
    code: Number,
    tipo: String,
    marca: String, 
    frecuencia: Number, 
    ubicacion: {
        type: [Number],
        index: {
            type: "2dsphere",
            sparse: true
        }
    }
});

componentSchema.statics.createInstance = function(code, tipo, marca, frecuencia, ubicacion) {
    return new this({
        code: code,
        marca: marca,
        tipo: tipo,
        frecuencia: frecuencia,
        ubicacion: ubicacion
    });
}

componentSchema.methods.toString = function() {
    return 'code:', this.code, "|", 'marca:', this.marca;
}

componentSchema.statics.allComponents = function(callback) {
    return this.find({}, callback);
}

componentSchema.statics.findByCode = function(code, callback) {
    return this.findOne({code: code}, callback);
}

componentSchema.statics.removeByCode = function(code, callback) {
    this.deleteOne({code: code}, callback);
}

componentSchema.statics.updateByCode = function(code, newComponent, callback) {
    this.updateOne({code: code}, {$set: newComponent}, callback);
}

componentSchema.statics.add = function (newComponent, callback) {
    this.create(newComponent, callback);
}

module.exports = mongoose.model("Component", componentSchema);

