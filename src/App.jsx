import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import "./App.css";


function App() {

  const mapDiv = useRef(null);
  var lon, lat;
  var expandCoordinates = new Expand({
    expandTooltip: "Open for Coordinates",
    collapseTooltip: "Close coordinates",
    expanded: true,
  });

  var expandWeather = new Expand({
    expandTooltip: "Open for Weather",
    collapseTooltip: "Close Weather",
    expanded: true,
  });



  useEffect(() => {


    if (mapDiv.current) {

      var cityPopulation = {
        type: "size",
        field: "POP",
        legendOptions:{
          title: "Population"
        },
        stops:[
          {value: 250000, size: "5"},
          {value: 500000, size: "20"},
          {value: 1000000, size: "40"},
          {value: 10000000, size: "80"}
        ]
      };

      const citiesRenderer = {
        type: "simple", 
        visualVariables: [cityPopulation ],
        symbol: {
          type: "simple-marker", 
          size: 5,
          color: [150, 0, 150],
          outline: null
        }
        
      };
      

      const fl = new FeatureLayer({
        portalItem: { 
          id: "6996f03a1b364dbab4008d99380370ed",
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/" ,
          renderer: citiesRenderer, 
        }
      });


      const mymap = new ArcGISMap({
        basemap: 'dark-gray-vector'
      });

      fl.renderer = citiesRenderer;
      mymap.add(fl);
      

      const view = new MapView({
        container: mapDiv.current,
        map: mymap,
        center: [7.6261,51.9607], //MS
        zoom: 6,
        popup: new Popup({
          dockEnabled: true,
          dockOptions: {
            breakpoint: false,
            position: "top-right"
          }
        })
      });
      view.ui.add(new Legend({ view: view }), "bottom-left");


      view.on("click", (e) => {
        lat = e.mapPoint.latitude;
        lon = e.mapPoint.longitude;
                
        expandCoordinates.view = view;
        expandCoordinates.content = getCityInfo(lon,lat);
        expandCoordinates.content += getWeatherInfo(lon,lat);
        
      });
      
      function getCityInfo(lon, lat){
        var cityInfo  =  "<h2> City name </h2>"
                      +  "lon: <b><span >" + lon + "</span></b> <br/>"
                      + "lat: <b><span >" + lat + "</span></b> <br/>"

        return cityInfo;
      }

      function getWeatherInfo(lon,lat){

        var weatherInfo =  "<h2> Weatherinfo" 
                        +  "</h2>"
                        +  "dummyinformation asdasd"

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=6b904086651c872d0e2c58c1529d2dcb`)
        .then(result => {
          console.log(result);
          weatherInfo = result;
        });

        axios
                        

        return weatherInfo;

      }

      view.ui.add(expandCoordinates, {
        position: "top-right",
        index: 1
      });



    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
