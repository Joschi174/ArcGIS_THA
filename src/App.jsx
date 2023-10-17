import React, { useRef, useEffect } from "react";

import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import Legend from "@arcgis/core/widgets/Legend.js";




import "./App.css";

function App() {

  const mapDiv = useRef(null);
  

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
        const lat = e.mapPoint.latitude;
        const lon = e.mapPoint.longitude;
        console.log(e.mapPoint.spatialReference);
        
        view.popupEnabled = false;
        view.popup.title = "City_Name_Placeholder"
        view.popup.content = "<li>lat: " + lat +"\nlon: " + lon;
        view.popup.open();
      });

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
