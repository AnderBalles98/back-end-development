const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

module.exports = {
        authenticate: function (req, res, next) {
            console.log("hola mundo");
            const data = req.body;
            console.log(data);
            User.findOne({email: data.email}, function(err, user) {
                if (err) {
                   return next(err);
                } else if (!user) {
                    return res.json({status: 404, message:"user not found"});
                } else if(bcrypt.compareSync(data.password, user.password)) {
                    const token = jwt.sign({id: user._id}, req.app.get('secretKey'), {expiresIn: '7d'});
                    return res.json({status:200, data: {user, token}})
                }
                return res.json({status:401, message:"invalid password"});

            });
        }
};