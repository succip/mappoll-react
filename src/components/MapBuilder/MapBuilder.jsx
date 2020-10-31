import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPollBuilder } from "../../services/MapBox/mapping";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map;

const MapBuilder = ({ mapLocation, handleMapMove, extentLocked }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    map = new MapPollBuilder(mapContainerRef.current, mapLocation, handleMapMove);
    return () => map.remove();
  }, []);

  useEffect(() => {
    map.toggleBoundary();
  }, [extentLocked]);

  return (
    <React.Fragment>
      <p className="mb-0">Set your map boundary:</p>
      <div className="mapContainer" ref={mapContainerRef} />
    </React.Fragment>
  );
};

export default MapBuilder;
