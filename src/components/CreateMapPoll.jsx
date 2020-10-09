import React, { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import MapBuilder from "./MapBuilder";

const CreateMapPoll = () => {
  const [question, setQuestion] = useState("");
  const [mapLocation, setMapLocation] = useState({
    lng: -79.843826,
    lat: 43.255203,
    zoom: 10,
  });
  const [extentLocked, setExtentLocked] = useState(false);

  return (
    <React.Fragment>
      <h3>Create a MapPoll</h3>
      <QuestionForm handleQuestionChange={setQuestion} />
      <div className="col-lg-7 col-md-9 col-sm-11 mx-auto">
        <h3>{question}</h3>
        <MapBuilder mapLocation={mapLocation} handleExtentLocked={setExtentLocked} handleMapMove={setMapLocation} />
        <button className="btn btn-primary m-2">Create Poll</button>
      </div>
    </React.Fragment>
  );
};

export default CreateMapPoll;
