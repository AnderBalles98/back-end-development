var User = require('../models/user');
var Token = require('../models/token');

exports.confirmationGet = function (req, res) {
    const data = req.body;
    Token.findOne({ token: data.token }).populate('userId').exec(function (error, token) {
        if (error) {
            return res.status(404).json({
                type: "not-verified",
                msg: "Token no encontrado"
            });
        }
        var user = token.userId;
        user.verify = true;
        user.save((error) => {
            Token.deleteOne({ token: data.token }, (error) => {
                res.redirecTo("/users");
            });
        });        
    });
}