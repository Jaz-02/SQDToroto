import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl"
import MapboxGeocoder from "mapbox-gl"

mapboxgl.accessToken ="pk.eyJ1IjoiZWxpemFiZXRoZ2giLCJhIjoiY2twOHBkaHNvMDN1MjJvcDR6aGhpM2h2ayJ9.U3EK7VZc-urMFKxXy83cpQ";

export default function NuevoBecal() {
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
        data: "./NuevoBecal/ADP.geojson"
      });

      map.addSource("maine", {
        type: "geojson",
        data: "./NuevoBecal/Carbono.geojson"
      });

      map.addSource("maine", {
        type: "geojson",
        data: "./NuevoBecal/Cobertura de la Vegetación.geojson"
      });

      map.addSource("maine", {
        type: "geojson",
        data: "./NuevoBecal/Flora y Fauna.geojson"
      });
  
      map.addSource("maine", {
        type: "geojson",
        data: "./NuevoBecal/Localidades Cercanas.geojson"
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