var mongoose = require("mongoose");
var Book = require("./book");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre: String
});

userSchema.methods.book = function(componentId, since, until, callback) {
    var book = Book.createInstance(since, until, componentId, this._id);
    book.save(callback);
}

userSchema.statics.createInstance = function(nombre) {
    return new this ({
        nombre:nombre
    });
}

module.exports = mongoose.model("User", userSchema);