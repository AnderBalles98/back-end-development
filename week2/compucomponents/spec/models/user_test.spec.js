var mongoose = require("mongoose");
var User = require("../../models/user");
var Book = require("../../models/book");
var Component = require("../../models/component");
var moment = require("moment");


function deleteAll(done) {
    Book.deleteMany({}, function(error, success) {
        User.deleteMany({}, function(error, success) {
            Component.deleteMany({}, function(error, success) {
                done();
            });
        });
    });
}

describe("user test", function() {


    beforeAll(function (done) {
        var mongoDB = "mongodb://localhost/test";
        mongoose.disconnect();
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Conection error"));
        db.once("open", function () {
            console.log("Conected sucesfully to test database");
            deleteAll(done);
        });
    });

    afterEach(function(done) {
        deleteAll(done);
    });

    afterAll(function() {
        mongoose.connection.close()
    }); 

    describe("Book a component", function () {
        it("Should exists book", function(done) {
            var user = User.createInstance("Yesenia");
            user.save();
            var component = Component.createInstance(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            component.save();

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            user.book(component._id, today, tomorrow, function () {
                Book.find({}).populate('userId').populate("componentId").exec(function (error, book) {
                    expect(book[0].userId.toObject()).toEqual(user.toObject());
                    expect(book[0].componentId.toObject()).toEqual(component.toObject());
                    done();
                });
            });
        });
    });

});

