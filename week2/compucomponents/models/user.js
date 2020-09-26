var mongoose = require("mongoose");
var Book = require("./book");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre: String
});

userSchema.statics.createInstance = function(nombre) {
    return new this ({
        nombre:nombre
    });
}

userSchema.statics.allUsers = function(callback) {
    return this.find({}, callback);
}

userSchema.statics.add = function (newUser, callback){
    newUser.save(callback);
}


userSchema.methods.book = function(componentId, since, until, callback) {
    var booking = Book.createInstance(since, until, componentId, this._id);
    booking.save(callback);
}

module.exports = mongoose.model("User", userSchema);