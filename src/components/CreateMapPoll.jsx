import React, { useState } from "react";
import mapboxgl from "mapbox-gl";
import QuestionForm from "../components/QuestionForm";
import MapBuilder from "./MapBuilder";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const CreateMapPoll = () => {
  const [question, setQuestion] = useState("");
  const [mapLocation, setMapLocation] = useState({
    lng: -79.843826,
    lat: 43.255203,
    zoom: 11,
  });

  return (
    <React.Fragment>
      <h3>Create a MapPoll</h3>
      <QuestionForm handleQuestionChange={setQuestion} />
      <div className="col-lg-7 col-md-9 col-sm-11 mx-auto">
        <h3>{question}</h3>
        <MapBuilder mapLocation={mapLocation} handleMapMove={setMapLocation} />
        <button className="btn btn-primary m-2">Create Poll</button>
      </div>
    </React.Fragment>
  );
};

export default CreateMapPoll;
