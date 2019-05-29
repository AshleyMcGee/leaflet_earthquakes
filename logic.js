(async function() {

    function setRadius(magnitude){
        return magnitude * 1200
    }

    function setColor(magnitude){
        if(magnitude > 5.5){
            return "dark red"
        }
        else if(magnitude < 5.5 && magnitude > 3.5){
            return "red"
        }
        else if(magnitude < 3.5 && magnitude > 1.5){
            return "orange"
        }
        else{
            return "yellow"
        }

    }

    function createFeatures(earthquakeData){

        //create and bind pop ups for the place the earthquake occured along with an unordered list for the magnitude
        //and date of occurence
    
        
        function onEachFeature(feature,layer){

            layer.bindPopup("<h3>" + feature.properties.place + "</h3>" + "<hr><ul><li>" + feature.properties.mag + "</li>" + "<li>" + new Date(feature.properties.time) + "</li></ul>")
        }

        //create the geoJSON layer. Use the onEachFeature function above 
        const earthquakes = L.geoJSON(earthquakeData, {
            onEachFeature: onEachFeature
        });
        

         
        createMaps(earthquakes)
    }

    function createMaps(earthquakes){

        //The streetmap image
        const streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.light",
            accessToken: API_KEY
            })
        
        //the base map that holds the streetmap image
        const baseMaps = {
            "Street Map": streetmap
        }

        //the overlay object that holds the earthquakes layer
        const overlayMaps = {
            Earthquakes: earthquakes
        }

        //create the map
        const map = L.map("map", {
            center: [30.2672, -97.7431],
            zoom: 4,
            layers: [streetmap, earthquakes]
            })

        //the layer control that allows us to (right now) toggle the earthquakes on and off
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
            }).addTo(map);
    }

        //API Key
        const API_KEY = "pk.eyJ1IjoiYXNobGV5bWNnZWUiLCJhIjoiY2p2b2Zwcjg4MDByMzQ5cGZyNzJ6OGx2ZSJ9.Cw5sL5cs6-tPsqHY1Dc2kQ"

        //Get GeoJSON from USGS and make sure it's correct
        const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        const response = await d3.json(url);
        console.log(response);
        //let coords = [response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]]
        //console.log(coords)

        createFeatures(response.features)


})()