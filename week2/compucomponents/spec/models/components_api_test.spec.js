var Component = require("../../models/component");
var request = require("request");
var server = require("../../bin/www");


describe("Component API", () => {
    describe("GET Components", () => {
        it("Status 200", () => {
            var newComponent = new Component(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
            Component.add(newComponent);
            
            request.get("http://localhost:3000/api/components/", function(error, respose, body) {
                expect(respose.statusCode).toBe(200);
            });

        });
    });

    describe("POST Components /create", () => {
        // la funcion done indica en qué momento acabar el test
        // se usa en estos casos debido a que es un request asincrónico
        it("Status 200", (done) => {
            var newComponent = {
                id: 10,
                marca: "AMD",
                tipo: "CPU",
                frecuencia: 3.7,
                latitud: 4.6283,
                longitud: -74.267
            };
            request.post("http://localhost:3000/api/components/create", {
                json: true,
                body: newComponent
            }, function (error, response, body){
                expect(response.statusCode).toBe(200);
                expect(Component.findById(10).frecuencia).toBe(3.7);
                done();
            });
        });
    });
});