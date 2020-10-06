const User = require('../models/user');

exports.createUser_get = function(req, res) {
    res.render("users/create", { 
        errors: {},
        usuario: new User() });
}

exports.createUser = function (req, res) {
    const data = req.body;
    if (data.password != data.passwordC) {
        console.log("contraseñas disctin");
        res.render("users/create", {
            errors: {
                passwordC: {
                    message: "Las contraseñas no coinsiden"
                }
            },
            usuario: {
                nombre: data.nombre,
                email: data.email
            }
        });
        return;
    }
    var user = new User({
        nombre: data.nombre,
        email: data.email,
        password: data.password
    });
    user.save((error, newUser) => {
        if (error) {
            res.render("users/create", { 
                errors: error.errors,
                usuario: {
                    nombre: user.nombre,
                    email: user.email
                }
            });
        } else {
            newUser.sendWellcomeEmail(() => {
                res.redirect("/users");
            });
        }
    });

}

exports.list = function(req, res) {
    User.find({}, (error, users) => {
        res.render("users/index", { users });
    })
}

exports.update_get = function(req, res) {
    const params = req.params;
    const data = req.body;
    User.findById(params.id, (error, user) => {
        if (error) {
            res.redirect("/users");
            return;
        }
        res.render("users/update", {
            errors: {},
            usuario: user
        });
    });
}

exports.remove = function (req, res) {
    const params = req.params;
    User.deleteOne({_id: params.id}, () => {
        res.redirect("/users");
    });
}

exports.update = function (req, res) {
    const params = req.params;
    const data = req.body;
    User.findByIdAndUpdate(params.id, { nombre: data.nombre }, (error) => {
        res.redirect("/users");
    })
}