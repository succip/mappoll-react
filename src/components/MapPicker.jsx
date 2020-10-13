import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { createYouMarker } from "../services/MapBox/mapping";
import { getResponses } from "../firebase/firebase";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map;

const MapPicker = ({ mapLocation, mapId }) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
    });

    map.on("click", ({ lngLat }) => {
      createYouMarker(lngLat, mapId).then((marker) => marker.addTo(map));
    });

    map.on("mouseover", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    return () => map.remove();
  }, []);

  return (
    <>
      <div className="mapContainer mapPicker" ref={mapContainerRef}></div>
    </>
  );
};

export default MapPicker;
