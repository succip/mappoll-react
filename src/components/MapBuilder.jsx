import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const MapBuilder = ({ mapLocation, handleMapMove }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
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

    map.on("click", () => {
      const llb = map.getBounds();
      const extent = {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [-79.95420426538023, 43.1768215506551],
              [-79.73344773461851, 43.31768215506551],
              [-79.73344773461851, 43.19265967576604],
              [-79.95420426538023, 43.19265967576604],
            ],
          },
        },
      };
      const extentJson = JSON.stringify(extent);
    });

    return () => map.remove();
  }, []);

  return (
    <React.Fragment>
      <div className="mapContainer" ref={mapContainerRef} />
    </React.Fragment>
  );
};

export default MapBuilder;
