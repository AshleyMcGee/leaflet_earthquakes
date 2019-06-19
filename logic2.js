
(async function(){

    function setColor(d) {
      return d > 6.0 ? '#7a0177' :
      d > 5.0 ? '#BD0026' :
      d > 4.0 ? '#E31A1C' :
      d > 3.0 ? '#FC4E2A' :
      d > 2.0 ? '#FD8D3C' :
      d > 1.0 ? '#FEB24C' :
      d > 0.0 ? '#FFEDA0' :
      '#696969';
      }

  function createFeatures(earthquakeData) {

      //Style for the circleMarker features
      function options(features){

        return {

          radius: features.properties.mag * 4,
          fillColor: setColor(features.properties.mag),
          fillOpacity: 0.75,
          color: "none",

          }
      }

    //Bind the information from the data to the popups
    function onEachFeature(feature,layer){

      layer.bindPopup("<h3>" + feature.properties.place + "</h3>" + "<hr><ul><li>" + feature.properties.mag + "</li>" + "<li>" + new Date(feature.properties.time) + "</li></ul>")
      }

      //Create the geojson layer with circlMarkers
      const earthquakes = L.geoJson(earthquakeData, {

          pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, options(feature))
          },
          onEachFeature: onEachFeature
      })

      createMap(earthquakes)

  }

  function createMap(earthquakes){

        //First tile layer for streets basic
        let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "streets-v9",
          accessToken: API_KEY
        })

        //Second tile layer for topography
        let satellites = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
          attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
          maxZoom: 18,
          id: "satellite-streets-v9",
          accessToken: API_KEY 
        })

        //Third tile layer for boundaries
        
        //Create basemaps
        const baseMaps = {

          "Satellite": satellites,
          "Streets": streets
          
      };

      // Create overlay object to hold our overlay layer
      const overlayMaps = {
      Earthquakes: earthquakes
};

        //Create the map itself
        const myMap = L.map("map", {
        center: [15.5994, -28.6731],
        zoom: 3,
        layers: [satellites, earthquakes]
          });

      // Pass our map layers into our layer control
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
        }).addTo(myMap);

      //create the legend
      const legend = L.control({position: 'bottomright'});

      legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend'),
        grades = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0],
        labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + setColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

          return div;
        };

      legend.addTo(myMap);

  }


    //Get the data
    const API_KEY = "pk.eyJ1IjoiYXNobGV5bWNnZWUiLCJhIjoiY2p3aWZrZjV1MDFhMTQ1bDFkb2Y3Nnc0MSJ9.5DVEGT_j11UntINqf87VQw"
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    const response = await d3.json(url)
    console.log(response);
    createFeatures(response.features)

  })()
