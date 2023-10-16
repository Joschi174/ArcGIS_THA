import React, { useRef, useEffect } from "react";
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import Symbol from "@arcgis/core/symbols/Symbol.js";

import "./App.css";

function App() {

  const mapDiv = useRef(null);
  const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  useEffect(() => {
    if (mapDiv.current) {

      var cityPopulation = {
        type: "size",
        field: "POP",
        legendOptions:{
          title: "Population"
        },
        stops:[
          {value: 100000, size: "5"},
          {value: 250000, size: "10"},
          {value: 500000, size: "20"},
          {value: 1000000, size: "30"},
          {value: 10000000, size: "50"}
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

      
      view.on("click", (e) => {
        const lat = Math.round(e.mapPoint.latitude * 1000) / 1000;
        const lon = Math.round(e.mapPoint.longitude * 1000) / 1000;
        
        view.popupEnabled = false;
        view.popup.title = lon + ", " + lat;
        view.popup.open();
      });

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
