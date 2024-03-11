document.addEventListener('DOMContentLoaded', function () {
    var cerrarHistoricoButton = document.getElementById('cerrarHistorico');
    var historicoDialog = document.getElementById('historicoDialog');

    cerrarHistoricoButton.addEventListener('click', function () {
        historicoDialog.close();
    });

    var map = L.map('map', {
        center: [36.7131066, -4.458959],
        zoom: 12
    });

    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    tiles.addTo(map);

    fetch('datos.json')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                const template = document.getElementById('paradas');
                const clone = document.importNode(template.content, true);
                const titulo = clone.querySelector('.titulo');
                const direccion = clone.querySelector('.direccion');
                const button = clone.querySelector('.historicoButton');

                titulo.textContent = feature.properties.NOMBRE;
                direccion.textContent = feature.properties.DIRECCION;

                button.addEventListener('click', function () {
                    historicoDialog.showModal();
                    var nombre = document.querySelector("#historicoDialog .nombre");
                    var capacidad = document.querySelector("#historicoDialog .capacidad");
                    var identificador = document.querySelector("#historicoDialog .identificador");
                    nombre.textContent = feature.properties.NOMBRE;
                    capacidad.textContent = "Capacidad: " + feature.properties.INFOESP[0].Capacidad_vehiculos;
                    identificador.textContent = "Identificador: " + feature.properties.ID;
                });

                document.getElementById('datos').appendChild(clone);

                L.geoJSON(feature, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup("<strong>" + feature.properties.NOMBRE + "</strong> <br>" + "<p>" + feature.properties.DIRECCION + "</p>");
                    }
                }).addTo(map);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
 

        
        

});