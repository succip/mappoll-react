import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPollPicker } from "../../services/MapBox/mapping";
import SeeResultsButton from "../../components/SeeResultsButton/SeeResultsButton";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map = {};

const MapPicker = ({ mapLocation, mapId }) => {
  const mapContainerRef = useRef(null);
  const [resultsReady, setResultsReady] = useState(false);

  useEffect(() => {
    map = new MapPollPicker(mapContainerRef.current, mapId, mapLocation, setResultsReady);
    return () => map.remove();
  }, []);

  const showResults = () => {
    map.addResponses(mapId);
  };

  return (
    <>
      <div className="mapContainer" ref={mapContainerRef}></div>
      {resultsReady ? <SeeResultsButton handleResults={showResults} /> : <div></div>}
    </>
  );
};

export default MapPicker;
