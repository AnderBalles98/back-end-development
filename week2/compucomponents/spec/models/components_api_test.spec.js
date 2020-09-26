var Component = require("../../models/component");
var Book = require("../../models/book");
var User = require("../../models/user");
var request = require("request");
var server = require("../../bin/www");
var mongoose = require("mongoose");

var baseUrl = "http://localhost:3000/api/components/";



function deleteAll(done) {
    Book.deleteMany({}, function(error, success) {
        User.deleteMany({}, function(error, success) {
            Component.deleteMany({}, function(error, success) {
                done();
            });
        });
    });
}

describe("Component API test", function () {

    beforeAll(function (done) {
        if (!server.listening) {
            server.listen(3000);
        }
        var mongoDB = "mongodb://localhost/compucomponents";
        mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        deleteAll(done);
    });
    afterEach(function(done) {
        deleteAll(done);
    });

    afterAll(function(done) {
        server.close(function () {
            mongoose.connection.close()
            done();
        });
    });

    describe("GET Components", () => {
        it("Status 200", function (done) {
            var newComponent = Component.createInstance(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                // console.log("-----");
                // console.log(success);
                // console.log("-----");

                request.get(baseUrl, { json: true }, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(body.components.length).toBe(1);
                    // console.log(body);
                    done();
                });
            });


        });
    });

    describe("POST Components /create", () => {
        // la funcion done indica en qué momento acabar el test
        // se usa en estos casos debido a que es un request asincrónico
        it("Status 200", (done) => {
            var newComponent = {
                code: 10,
                marca: "AMD",
                tipo: "CPU",
                frecuencia: 3.7,
                latitud: 4.6283,
                longitud: -74.267
            };
            request.post(baseUrl + "create", {
                json: true,
                body: newComponent
            }, function (error, response, body) {
                // console.log(body);
                expect(response.statusCode).toBe(200);
                request.get("http://localhost:3000/api/components/", { json: true }, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(body.components.length).toBe(1);
                    // console.log(body);
                    done();
                });
            });
        });
    });

    describe("DELETE Component /remove", () => {
        it("Status 200", (done) => {
            var newComponent = Component.createInstance(13, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                newComponent = Component.createInstance(43, "CPU", "Intel", 3.8, [4.6482838, -74.2479]);
                Component.add(newComponent, function (error, success) {
                    request.delete(baseUrl + "remove/43", { json: true }, function (error, response, body) {
                        expect(response.statusCode).toBe(200);
                        request.get("http://localhost:3000/api/components/", { json: true }, function (error, response, body) {
                            expect(response.statusCode).toBe(200);
                            expect(body.components.length).toBe(1);
                            // console.log(body);
                            done();
                        });
                    });
                });
            });
        })
    });

    describe("POST Component /update/:id", () => {
        it("Status 200", (done) => {
            var newComponent = Component.createInstance(58, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent, function (error, success) {
                newComponent = Component.createInstance(25, "CPU", "Intel", 3.8, [4.6482838, -74.2479]);
                Component.add(newComponent, function (error, success) {
                    newComponent = Component.createInstance(36, "CPU", "AMD", 3.5, [4.6283, -74.267]);
                    newComponent = newComponent.toObject();
                    delete newComponent._id;
                    request.post(baseUrl + "update/58", { json: true, body: newComponent }, function (error, response, body) {
                        expect(response.statusCode).toBe(200);
                        Component.findByCode(newComponent.code, function (error, component) {
                            var resComponent = component.toObject();
                            delete resComponent._id;
                            delete resComponent.__v;
                            expect(newComponent).toEqual(resComponent);
                            done();
                        });
                    });
                });
            });
        })
    });
});