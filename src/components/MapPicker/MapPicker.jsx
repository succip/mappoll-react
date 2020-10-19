import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPollPicker } from "../../services/MapBox/mapping";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map;

const MapPicker = ({ mapLocation, mapId }) => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    map = new MapPollPicker(mapContainerRef.current, mapId, mapLocation);
    return () => map.remove();
  }, []);

  return (
    <>
      <div className="mapContainer" ref={mapContainerRef}></div>
    </>
  );
};

export default MapPicker;
