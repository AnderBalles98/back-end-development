var Component = require("../../models/component");
var User = require("../../models/user");
var Book = require("../../models/book");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");
const component = require("../../models/component");

var baseUrl = "http://localhost:3000/api/users/";

function deleteAll(done) {
    Book.deleteMany({}, function (error, success) {
        User.deleteMany({}, function (error, success) {
            Component.deleteMany({}, function (error, success) {
                done();
            });
        });
    });
}

describe("User API test", function () {

    beforeAll(function (done) {
        var mongoDB = "mongodb://localhost/compucomponents";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "Conection error"));
        db.once("open", function () {
            console.log("Conected sucesfully to compucomponents database");
            deleteAll(done);
        });
    });

    afterEach(function (done) {
        deleteAll(done);
    });

    afterAll(function (done) {
        mongoose.connection.close(function () {
            done();
        })
    });

    describe("GET Users", function () {
        it("Status 200", function (done) {
            var newUser = User.createInstance("tatiana");
            newUser.save();
            request.get(baseUrl, { json: true }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body.users[0].nombre).toEqual(newUser.nombre);
                done();
            });
        });

    });

    describe("POST Users /create", function () {
        it("Status 200", function (done) {
            var dataToSent = {
                nombre: "pablo"
            };
            request.post(baseUrl + "create", { json: true, body: dataToSent }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(body.newUser.nombe).toBe(dataToSent.nombew);
                done();
            });
        });
    });

    describe("POST User /booking", function () {
        it("Status 200", function (done) {
            var newUser = User.createInstance("tatiana");
            newUser.save();
            var newComponent = Component.createInstance(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            newComponent.save();
            var dataToSend = {
                since: "2020-08-05",
                until: "2020-08-07",
                componentId: newComponent._id.toString()
            };
            request.post(baseUrl + "booking/" + newUser._id, { json: true, body: dataToSend }, function (error, response, body) {
                expect(body.booking.userId).toBe(newUser._id.toString());
                expect(body.booking.componentId).toBe(newComponent._id.toString());
                done();
            });
        })
    });
});