<https://ashleymcgee.github.io/leaflet_earthquakes/>

# Weekly Tectonic Activity via Leaflet.js

This experimental page combines the modular Javascript paradigm with the Leaflet.js library. My script makes api calls to the United States Geological Survey website to pull weekly earthquake data. API calls are also made to Mapbox.com for map tile images. OpenStreet data is given credit for the geodata used to position the map.

![alt text](https://github.com/AshleyMcGee/leaflet_earthquakes/blob/master/leafletmap1.png "Screen shot of my satellite view of the planet Earth depicting the magnitudes of various earthquakes. Magnitude intensity is expressed by the size of a circle marker and the color of the circle marker.")

<p align="center"><em>Map of earthquake activity for June 4, 2019, generated from the U.S. Geological Survey.</em></p>


## Why Earthquakes

I have always been interested in plate tectonics. I find it extremely fascinating to watch the shifting of the most fundamental foundation of life as we know it and gauge its impact on civilization. For example, there is a new earthqake in Oklahoma every day, but these are not due to tectonic activity. One might assume this might be due to fracking. However, the USGS states that [wastewater disposal causes the majority of these earthquakes (https://www.usgs.gov/faqs/oklahoma-now-has-more-earthquakes-a-regular-basis-california-are-they-due-fracking?qt-news_science_products=0#qt-news_science_products) 90% of wastewater disposal comes from oil production, not fracking. 

Soon, volcanic activity will also be added to the map. 


## Modular Javascript

Though the entire process of creating the map, pulling the data from the USGS, creating the layer controller, and creating the legend could all have been done procedurally, it makes more sense to employ the modular paradigm. Each of the modules receive data from each other while keeping each module separate from the others, preventing it from interfering with other modules and causing variable confusion or scoping errors. Notice from this image that the features function calls the ```createMap``` function, which creates the map after all of the features have been calculated and declared. 

![alt text](https://github.com/AshleyMcGee/leaflet_earthquakes/blob/master/codeSnippet.png "A screen shot of the function that creates each feature for the map and the call to the createMap function.")

<p align="center"><em>The modular paradigm reduces scoping issues and prevents variables from accessing each other.</em></p>

The ```createFeatures``` function is called at the bottom of the async function, after the data is pulled in from the USGS as a feature group.


# Take Away

I learned JavaScript before I ever touched Python. I knew that at some point I was going to need it, whether I wanted to admit that or not. JavaScript is difficult and requires lots of practice. However, it is becoming clear that JavaScript is a useful language. This experiment in visualization was difficult to achieve, and it remains incomplete. I look forward to exploring this library fully and adding improvements to the map experience. 
