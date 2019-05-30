
(async function(){

    const API_KEY = "pk.eyJ1IjoiYXNobGV5bWNnZWUiLCJhIjoiY2p2b2Zwcjg4MDByMzQ5cGZyNzJ6OGx2ZSJ9.Cw5sL5cs6-tPsqHY1Dc2kQ"
    const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    const response = await d3.json(url)
    console.log(response);
    console.log([response.features[0].geometry.coordinates[1], response.features[0].geometry.coordinates[0]]);


    function setColor(magnitude){

      
        if(magnitude >= 5.0){
            return "purple"
        }
        else if(magnitude < 5.0 && magnitude > 4.0){
            return "blue"
        }
        else if(magnitude < 4.0 && magnitude > 3.0){
            return "red"
        }
        else if(magnitude < 3.0 && magnitude > 2.0){
          return "orange"
        }
        else if(magnitude < 2.0 && magnitude > 1.0){
          return "yellow"
        }
        else{
            return "green"
        }
        

    }

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

    function options(features){

        return {

          radius: features.properties.mag * 4,
          fillColor: setColor(features.properties.mag),
          fillOpacity: 0.75,
          color: "none",

        }
    }

    function onEachFeature(feature,layer){

      layer.bindPopup("<h3>" + feature.properties.place + "</h3>" + "<hr><ul><li>" + feature.properties.mag + "</li>" + "<li>" + new Date(feature.properties.time) + "</li></ul>")
  }

    L.geoJson(response, {

        pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng, options(feature))
        },
        onEachFeature: onEachFeature
    }).addTo(myMap)

    
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

      const div = L.DomUtil.create('div', 'info legend');
      labels = ['<strong>Magnitude</strong>'],
      categories = ['Greater than 5.0','Between 4.0 and 5.0','Between 2.0 and 3.0','Between 1.0 and 2.0', "Less than 1.0"];

      for (var i = 0; i < categories.length; i++) {

              div.innerHTML += 
              labels.push(
                  '<i style="background:' + setColor(categories[i]) + '"></i> ' +
              (categories[i] ? categories[i] : '+'));

              }

          div.innerHTML = labels.join('<br>');

      return div;
      };
      legend.addTo(myMap);
    

  })()
