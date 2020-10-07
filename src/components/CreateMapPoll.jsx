import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import QuestionForm from "../components/QuestionForm";
import MapBuilder from "./MapBuilder";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken = "pk.eyJ1Ijoic3VjY2lwIiwiYSI6ImNrNWI4Z3RvdjE4YTAza21tbGtpMjJtamgifQ.tSYDt7w3D8EOe6nCIkycOQ";

const CreateMapPoll = () => {
  return (
    <React.Fragment>
      <h3>Create a MapPoll</h3>
      <QuestionForm />
      <div className="col-lg-7 col-md-9 col-sm-11 mx-auto">
        <MapBuilder />
      </div>
    </React.Fragment>
  );
};

export default CreateMapPoll;
