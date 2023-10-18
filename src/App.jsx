import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import Legend from "@arcgis/core/widgets/Legend.js";
import axios from "axios";
import WeatherTable from "./WeatherTable";
import "./App.css";


function App() {

  const mapDiv = useRef(null);
  var weatherData = [
    "dummy"
  ];

  var lon, lat;

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
                
        updateExpandContent(lon,lat)
        
      });
      

      async function updateExpandContent(lon,lat){

        
        let result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=6b904086651c872d0e2c58c1529d2dcb`)
          weatherData = result.data
          
          //to cehck json structure
          console.log("weatherdata json");
          console.log(result);

          let content = document.createElement("WeatherTable");
          
          
          let fragment      = "<h2> Location </h2>"
                            + "lon: <b><span >" + lon + "</span></b> <br/>"
                            + "lat: <b><span >" + lat + "</span></b> <br/><br/>"
                            + "<h2> Weatherdata </h2>"
                            +"<table style='width:100%'>"
                           

          
          
          for (let index = 0; index < weatherData?.list.length; index++) {
            const element = weatherData?.list[index];
            
            fragment  +="<tr>"
                      +   "<td>"+new Date(element.dt*1000).toLocaleDateString()+"</td>"
                      +   "<td>"+new Date(element.dt*1000).getHours()+"h</td>"
                      +    "<td>"+element.main.temp+"</td>"
                      +    "<td>"+element.weather[0].description+"</td>"
                      +    "<td>"+element.wind.speed+"</td>"
                      +  "</tr>"
          }
          fragment += "</table>";
          content.innerHTML = fragment;
          



          view.popupEnabled = false;
          view.popup.viewModel.includeDefaultActions = false;
          view.popup.title = "<h2>" +weatherData?.city.name+ "</h2>";
          view.popup.content = content;
          view.popup.open();
      }
    }
  }, []);

  return (
    <div className="mapDiv" ref={mapDiv}>
     
    </div>
  );
}

export default App;
