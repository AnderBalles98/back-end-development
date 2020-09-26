var User = require("../../models/user");


exports.user_list = function (req, res) {
    User.allUsers(function (error, users) {
        res.status(200).json({
            users
        });
    });
}

exports.user_create = function (req, res) {
    const data = req.body;
    var newUser = User.createInstance(data.nombre);
    User.add(newUser, function (error, success) {
        if (!error) {
            res.status(200).json({
                newUser
            });
        } else {
            res.status(400);
            res.end();
        }
    });
}

exports.user_booking = function (req, res) {
    const data = req.body;
    const params = req.params;
    User.findById(params.id, function (error, user) {
        if (error) {
            res.status(404);
            res.end();
        } else {
            user.book(data.componentId, data.since, data.until, function (error, booking) {
                if (!error) {
                    res.status(200).json({
                        booking
                    });
                } else {
                    res.status(404);
                    res.end();
                }
            });
        }
    });

}