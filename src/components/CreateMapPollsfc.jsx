import React, { useState, useEffect, useRef } from "react";
import MapBuilder from "./MapBuilder";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const CreateMapPoll = () => {
  const mapContainerRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [mapLocation, setMapLocation] = useState({
    lng: -79.843826,
    lat: 43.255203,
    zoom: 11,
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLocation.lng, mapLocation.lat],
      zoom: mapLocation.zoom,
    });

    return () => map.remove();
  }, []);

  return (
    <React.Fragment>
      <h3>Create a MapPoll</h3>
      <h3>{question}</h3>
      <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div className="mapContainer" ref={mapContainerRef} />
      </div>
    </React.Fragment>
  );
};

export default CreateMapPoll;
