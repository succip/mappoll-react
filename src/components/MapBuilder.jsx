import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { buildPolygonFromBounds } from "../helpers/geometry";
import { BsUnlock } from "react-icons/bs";
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

    map.on("click", () => {});

    document.getElementById("lock").addEventListener("click", () => {
      if (map.getLayer("extent")) {
        map.removeLayer("extent");
        map.removeSource("extent");
      }
      const boundaryPolygon = buildPolygonFromBounds(map.getBounds());
      map.addLayer({
        id: "extent",
        type: "line",
        source: boundaryPolygon,
        paint: {
          "line-width": 3,
          "line-color": "#C00",
        },
      });
    });

    return () => map.remove();
  }, []);

  const lockMap = (map) => {
    console.log(map.options.container);
  };

  return (
    <React.Fragment>
      <div className="mapContainer" ref={mapContainerRef} />
      <button id="lock" className="btn btn-light float-left m-2">
        <BsUnlock />
        &nbsp; Lock Extent
      </button>
    </React.Fragment>
  );
};

export default MapBuilder;
