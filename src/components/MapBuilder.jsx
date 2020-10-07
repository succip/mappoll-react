import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const MapBuilder = ({ mapLocation, handleMapMove }) => {
  const mapContainerRef = useRef(null);

  const buildPolygonFromExtent = ({ _ne, _sw }) => {
    const ne = _ne;
    const sw = _sw;
    console.log(sw.lng);
    const gjson = {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [sw.lng, ne.lat],
              [ne.lng, ne.lat],
              [ne.lng, sw.lat],
              [sw.lng, sw.lat],
            ],
          ],
        },
      },
    };

    return gjson;
  };

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
      const newPoly = buildPolygonFromExtent(map.getBounds());

      map.addSource("extent", newPoly);
      map.addLayer({
        id: "extent",
        type: "fill",
        source: "extent",
        layout: {},
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.8,
        },
      });
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
