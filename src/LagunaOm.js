import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl"
import MapboxGeocoder from "mapbox-gl"

mapboxgl.accessToken ="pk.eyJ1IjoiZWxpemFiZXRoZ2giLCJhIjoiY2twOHBkaHNvMDN1MjJvcDR6aGhpM2h2ayJ9.U3EK7VZc-urMFKxXy83cpQ";

export default function LagunaOm() {
  const [pageIsMounted, setPageIsMounted] = useState(false)
  
  useEffect(()=>{
    setPageIsMounted(true)
    const map = new mapboxgl.Map({
      container: 'map',
      style: "mapbox://styles/elizabethgh/ckp8r5cxj28lq18p5ud5gwhy4",
      center:  [-89.15095099588774, 18.701800462540451],
      zoom: 10
    })
    map.on("load", function () {
      // Add a data source containing GeoJSON data.
      map.addSource("maine", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // These coordinates outline Maine.
            coordinates: [
              [
                [-89.15095099588774, 18.701800462540451],
                [-89.141583912131964, 18.69842832936191],
                [-89.131144788298116, 18.695740791966902],
                [-88.937578767594076, 18.675618955593979],
                [-88.857868640716461, 18.665993374115509],
                [-88.840983370433989, 18.664000194295809],
                [-88.849427368309534, 18.595977367992109],
                [-88.994963494932094, 18.616440955400648],
                [-89.007085656287515, 18.551344205106229],
                [-89.151041937400151, 18.569824572297399],
                [-89.15095099588774, 18.701800462540451],
              ],
            ],
          },
        },
      });
  
      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: "maine",
        type: "fill",
        source: "maine", // reference the data source
        layout: {},
        paint: {
          "fill-color": "#0080ff", // blue color fill
          "fill-opacity": 0.5,
        },
      });
      // Add a black outline around the polygon.
       map.addLayer({
        id: "outline",
        type: "line",
        source: "maine",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        }
      })
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.FullscreenControl());
    });
  }) 

  return (
    <>
    <head><link
    href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css'
    rel='stylesheet'/></head>
    <div id="map" style={{height:"100vh", width:"100%"}}>
    </div>
    </>
  );
};