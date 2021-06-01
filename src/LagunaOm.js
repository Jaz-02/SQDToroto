import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl"

import ADP from "./Data/LagunaOm/ADP.geojson"
import CO2 from "./Data/LagunaOm/Ton CO2 carbono.geojson"

import FF from "./Data/LagunaOm/Flora y Fauna.geojson"



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
      map.addSource("ADP", {
        type: "geojson",
        data: ADP
      });

      // map.addSource("maine", {
      //   type: "geojson",
      //   data: "./LagunaOm/Cobertura Vegetal.geojson"
      // });

      map.addSource("FF", {
        type: "geojson",
        data: FF
      });

      // map.addSource("maine", {
      //   type: "geojson",
      //   data: "./LagunaOm/Localidades Beneficiadas.geojson"
      // });
  
      map.addSource("CO2", {
        type: "geojson",
        data: CO2
      });
      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: "maine",
        type: "fill",
        source: "ADP", // reference the data source
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
        source: "ADP",
        layout: {},
        paint: {
          "line-color": "#000",
          "line-width": 3,
        }
      })

      map.addLayer({
        id: 'CO2-heat',
        type: 'heatmap',
        source: 'CO2',
        maxzoom: 15,
        paint: {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            property: 'dbh',
            type: 'exponential',
            stops: [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            stops: [
              [11, 1],
              [15, 3]
            ]
          },
          // assign color values be applied to points depending on their density
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(236,222,239,0)',
            0.2, 'rgb(208,209,230)',
            0.4, 'rgb(166,189,219)',
            0.6, 'rgb(103,169,207)',
            0.8, 'rgb(28,144,153)'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            stops: [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            default: 1,
            stops: [
              [14, 1],
              [15, 0]
            ]
          },
        }

      }, 'waterway-label');

      map.addLayer({
        'id': 'FF-viz',
        'type': 'circle',
        'source': 'FF',
        'paint': {
          'circle-stroke-color': '#000',
          'circle-stroke-width': 1,
          'circle-color': '#000'
        }
      });
      
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