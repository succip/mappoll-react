import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { youMarker } from "../../services/MapBox/mapping";
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
      const ym = new youMarker(mapId, lngLat);
      ym.addTo(map);
    });

    map.on("mouseover", () => (map.getCanvas().style.cursor = "pointer"));

    return () => map.remove();
  }, []);

  return (
    <>
      <div className="mapContainer" ref={mapContainerRef}></div>
    </>
  );
};

export default MapPicker;
