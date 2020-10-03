var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var Book = require("./book");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");


const saltRounds = 10;

function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
}

var userSchema = new Schema({
    nombre: {
        type: String, 
        trim: true, // si hay espacios, los elimina
        required: [true, "nombre is required"] // requerido, y mensaje de error
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        lowercase: true, // pasa todo a minúscula
        validate: [validateEmail, 'email invalid'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is requires']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verify: {
        type: Boolean,
        default: false
    }
});

// requerido para que se cumplan los atributos 'unique'
userSchema.plugin(uniqueValidator, {
    message: "{PATH} already exists"
});

// ejecuta el callback antes del evento insertado por comillas, en este caso 'save'
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds); // saltRounds indica una aleatoriedad al crear la encriptación
    }
    next();
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

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);