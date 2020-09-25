var Component = require("../../models/component");

beforeEach(() => {
    Component.allComponents = [];
});

describe("Component.allComponents", () => {
    it('Comienza vacia', () => {
        expect(Component.allComponents.length).toBe(0);
    });
});

describe("Component.add", () => {
    it("Añadir nuevo componente", () => {
        expect(Component.allComponents.length).toBe(0);
        const newComponent = new Component(1, "GPU", "NVIDIA", 1500, [4.6283, -74.267]);
        Component.add(newComponent);
        expect(Component.allComponents.length).toBe(1);
        expect(Component.allComponents[0]).toBe(newComponent)
    })
});

describe("Component.findById", () => {
    it("Encontrar componente id:1", () => {
        expect(Component.allComponents.length).toBe(0);
        var newComponent = new Component(1, "CPU", "NVIDIA", 1500, [4.6283, -74.267]);
        Component.add(newComponent);
        newComponent = new Component(2, "GPU", "AMD", 1500, [4.6283, -74.267]);
        Component.add(newComponent);
        expect(Component.allComponents.length).toBe(2);
        
        var targetComponent = Component.findById(1);
        expect(targetComponent.id).toBe(1);
        expect(targetComponent.tipo).toBe("CPU");
        expect(targetComponent.marca).toBe("NVIDIA");

    });
});

describe("Component.removeById", () => {
    it("Eliminar componente id:2", () => {
        expect(Component.allComponents.length).toBe(0);
        var newComponent = new Component(1, "CPU", "NVIDIA", 1500, [4.6283, -74.267]);
        Component.add(newComponent);
        newComponent = new Component(2, "GPU", "AMD", 1500, [4.6283, -74.267]);
        Component.add(newComponent);
        expect(Component.allComponents.length).toBe(2);

        Component.removeById(2);
        expect(Component.allComponents.length).toBe(1);

    });
});