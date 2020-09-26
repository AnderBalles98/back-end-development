var Component = require("../../models/component");
var Book = require("../../models/book");
var User = require("../../models/user");
var mongoose = require("mongoose");


function deleteAll(done) {
    Book.deleteMany({}, function(error, success) {
        User.deleteMany({}, function(error, success) {
            Component.deleteMany({}, function(error, success) {
                done();
            });
        });
    });
}

describe("Component TEST", function () {
    beforeAll(function (done) {
        var mongoDB = "mongodb://localhost/test";
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

    afterEach(function (done) {
        deleteAll(done);
    });

    afterAll(function (done) {
        mongoose.connection.close(function () {
            done();
        })
    });

    describe("Component.createInstance", () => {
        it("Create new instance", (done) => {
            var newComponent = Component.createInstance(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            expect(newComponent.code).toBe(1);
            done();
        });
    });

    describe("Component.allComponents", function () {
        it("Starts empty", function (done) {
            Component.allComponents(function (error, components) {
                expect(components.length).toBe(0);
                done();
            });
        });
    });

    describe("Component.create", function () {
        it("Create Component", function (done) {
            var newComponent = Component.createInstance(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                Component.allComponents(function (error, components) {
                    expect(components.length).toBe(1);
                    done();
                });
            });
        });
    });

    describe("Component.findByCode", function () {
        it("Find Component code 15", function (done) {
            var newComponent = Component.createInstance(15, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                newComponent = Component.createInstance(21, "CPU", "Intel", 3.8, [4.6482838, -74.2479]);
                Component.add(newComponent, function (error, success) {
                    Component.findByCode(15, function (error, component) {
                        expect(component.code).toBe(15);
                        done();
                    });
                });
            });
        });
    });


    describe("Component.removeByCode", function () {
        it("Remove Component code 43", function (done) {
            var newComponent = Component.createInstance(13, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                newComponent = Component.createInstance(43, "CPU", "Intel", 3.8, [4.6482838, -74.2479]);
                Component.add(newComponent, function (error, success) {
                    Component.removeByCode(43, function (error, success) {
                        // console.log("-----");
                        // console.log(success);
                        // console.log("-----");
                        expect(success.deletedCount).toBe(1);
                        done();
                    });
                });
            });
        });
    });

    describe("Component.updateByCode", function () {
        it("Update Component code 58", function (done) {
            var newComponent = Component.createInstance(58, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                newComponent = Component.createInstance(25, "CPU", "Intel", 3.8, [4.6482838, -74.2479]);
                Component.add(newComponent, function (error, success) {
                    newComponent = Component.createInstance(36, "CPU", "AMD", 3.5, [4.6283, -74.267]);
                    newComponent = newComponent.toObject();
                    delete newComponent._id;
                    Component.updateByCode(58, newComponent, function (error, success) {
                        // console.log("-----");
                        // console.log(success);
                        // console.log("-----");
                        expect(success.nModified).toBe(1);
                        done();
                    });
                });
            });
        });
    });
});