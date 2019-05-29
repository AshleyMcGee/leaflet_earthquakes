
(async function(){

    const API_KEY = "pk.eyJ1IjoiYXNobGV5bWNnZWUiLCJhIjoiY2p2b2Zwcjg4MDByMzQ5cGZyNzJ6OGx2ZSJ9.Cw5sL5cs6-tPsqHY1Dc2kQ"
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    const response = await d3.json(url)
    console.log(response);
    console.log([response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]]);

    

    const myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3
      });
      
      L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-basic",
        accessToken: API_KEY
      }).addTo(myMap);

      function setRadius(magnitude){
        return magnitude * 1200 
    }

    function setColor(magnitude){
        if(magnitude > 5.0){
            return "dark red"
        }
        else if(magnitude < 5.0 && magnitude > 4.0){
            return "red"
        }
        else if(magnitude < 3.0 && magnitude > 2.0){
            return "orange"
        }
        else{
            return "yellow"
        }

    }

    function createFeatures(earthquakeData) {
        var earthquakes = L.geoJson(earthquakeData,{
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              radius: feature.properties.mag*5,
              fillColor: getColor(feature.properties.mag),
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.9})
              .bindPopup("<h3>" + "Location: " + feature.properties.place +
                "</h3><hr><p>" + "Date/Time: " + new Date (feature.properties.time) + "<br>" +
                "Magnitude: " + feature.properties.mag + "</p>");
        }
      })



})()
