import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { buildPolygonFromBounds } from "../utils/geometry";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map;

const MapBuilder = ({ mapLocation, handleMapMove, extentLocked }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
    });

    map.on("moveend", () => {
      handleMapMove({
        lng: parseFloat(map.getCenter().lng.toFixed(4)),
        lat: parseFloat(map.getCenter().lat.toFixed(4)),
        zoom: parseFloat(map.getZoom().toFixed(2)),
      });
    });
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map.getLayer("extent")) {
      map.removeLayer("extent");
      map.removeSource("extent");
      return;
    }

    if (map.loaded()) {
      map.addLayer({
        id: "extent",
        type: "line",
        source: buildPolygonFromBounds(map.getBounds()),
        paint: {
          "line-width": 3,
          "line-color": "#C00",
        },
      });
    }
  }, [extentLocked]);

  return (
    <React.Fragment>
      <div className="mapContainer" ref={mapContainerRef} />
    </React.Fragment>
  );
};

export default MapBuilder;
