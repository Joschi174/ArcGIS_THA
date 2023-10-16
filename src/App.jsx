import React, { useRef, useEffect } from "react";
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import ArcGISMap from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import "./App.css";

function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {

      

      const fl = new FeatureLayer({
        portalItem: {  // autocasts as esri/portal/PortalItem
          id: "6996f03a1b364dbab4008d99380370ed",
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/"
          
        }
      });



      const mymap = new ArcGISMap({
        basemap: 'gray-vector'
      });

      mymap.add(fl);

      const view = new MapView({
        container: mapDiv.current,
        map: mymap,
        center: [7.6261,51.9607],
        zoom: 10
      });

      const bookmarks = new Bookmarks({
        view,
        // allows bookmarks to be added, edited, or deleted
        editingEnabled: true
      });

      const bkExpand = new Expand({
        view,
        content: bookmarks,
        expanded: true
      });

      // Add the widget to the top-right corner of the view
      view.ui.add(bkExpand, "top-right");

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
