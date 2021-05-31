import React from "react";
import mapbox from "mapbox-gl";

export const Capas = () => {
  Map.on("load", function () {
    Map.addSource("ADP", {
      type: "geojson",
      data: "./ADP.geojson",
    });
  });

  map.addLayer({
    id: "ADP",
    type: "circle",
    source: "museums",
    layout: {
      // Make the layer visible by default.
      visibility: "visible",
    },
    paint: {
      "circle-radius": 8,
      "circle-color": "rgba(55,148,179,1)",
    },
    "source-layer": "museum-cusco",
  });

  return (
    <div>
      <h1>Hola Mundo</h1>
    </div>
  );
};
