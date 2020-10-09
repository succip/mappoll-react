import React, { useState } from "react";
import QuestionForm from "../components/QuestionForm";
import LockExtentButton from "../components/LockExtentButton";
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
        <MapBuilder mapLocation={mapLocation} handleMapMove={setMapLocation} extentLocked={extentLocked} />
        <div className="d-flex mt-2 justify-content-between">
          <LockExtentButton extentLocked={extentLocked} handleExtentLocked={setExtentLocked} />
          <button className="btn btn-primary float-right">Create Poll</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateMapPoll;
