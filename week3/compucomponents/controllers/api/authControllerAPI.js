const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Token = require("../../models/token");

module.exports = {
        authenticate: function (req, res, next) {
            const data = req.body;
            User.findOne({email: data.email}, function(err, user) {
                if (err) {
                   return next(err);
                } else if (!user) {
                    return res.json({status: 404, message:"user not found"});
                } else if(bcrypt.compareSync(data.password, user.password)) {
                    let token = new Token({ userId: user._id, token: jwt.sign({id: user._id}, req.app.get('secretKey'), {expiresIn: '7d'})});
                    token.save(function (err, token) {
                        if (err) {
                            return next(err);
                        }
                        return res.json({status:200, data: {user, token: token.token}})
                    });
                }else {
                    return res.json({status:401, message:"invalid password"});
                }

            });
        }
};