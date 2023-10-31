// /**************************************************
//     Leaflet (https://leafletjs.com/)
//     Copyright (c) 2010-2019, Vladimir Agafonkin
//     Copyright (c) 2010-2011, CloudMade
//     All rights reserved.
// ***************************************************/
var map;
var marker;
var tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {attribution: "&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"}
);

function makeMap() {
    map = L.map("map", {
        center: currentGeo,
        zoom: 16,
    });
    tileLayer.addTo(map);

    var crossIcon = L.icon({
        /* 国土地理院地図マーカーを利用（https://maps.gsi.go.jp/） */
        iconUrl: "https://maps.gsi.go.jp/image/map/crosshairs.png",
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    var crossMarker = L.marker( map.getCenter(),{
        icon:crossIcon,  
        zIndexOffset: 1000,
        interactive: false
    }).addTo(map);

    map.on("move", function(e) {
        crossMarker.setLatLng(map.getCenter());
    });
}

function makeMarkers(results) {
    if (marker != null){
        map.removeLayer(marker);
    }
    var places = [];
    for (var i=0; i<results.length; i++){
        var geoData = results[i];
        var memo = geoData.get("memo");
        var lat = geoData.get("geoPoint").latitude;
        var lon = geoData.get("geoPoint").longitude;
        var obj = {
            "type": "Feature",
            "properties": {
                "name": memo
            },
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            }
        };
        places.push(obj);
    }

    marker = L.geoJson(places, {
        onEachFeature: function(places, layer) {
            layer.bindPopup(places.properties.name);
        }
    }).addTo(map);
}