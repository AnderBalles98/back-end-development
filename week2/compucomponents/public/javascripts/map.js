var map = L.map('main_map').setView([4.6482837, -74.2478938], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

$.ajax({
    dataType: "json",
    url:"/api/components",
    success: function(result) {
        console.log(result);
        result.components.forEach(component => {
            console.log(component.ubicacion);
            L.marker(component.ubicacion, {title: component.id}).addTo(map);
        });
    }
});