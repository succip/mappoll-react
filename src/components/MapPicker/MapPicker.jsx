import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPollPicker } from "../../services/MapBox/mapping";
import SeeResultsButton from "../../components/SeeResultsButton/SeeResultsButton";
import NameInput from "../../components/NameInput/NameInput";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
let map = {};

const MapPicker = ({ mapLocation, mapId }) => {
  const mapContainerRef = useRef(null);
  const [resultsReady, setResultsReady] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    map = new MapPollPicker(mapContainerRef.current, mapId, setResultsReady);
    map.setLocation(mapLocation);
    return () => map.remove();
  }, []);

  const showResults = () => {
    map.addResponses(mapId);
    setResultsReady(false);
  };

  useEffect(() => {
    map.setName(name);
  }, [name]);

  return (
    <>
      <NameInput handleNameChange={setName} />
      <div className="mapContainer" ref={mapContainerRef}></div>
      {resultsReady ? <SeeResultsButton handleResults={showResults} /> : <div></div>}
    </>
  );
};

export default MapPicker;
