import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getMapPollById } from "../../firebase/firebase";
import MapPicker from "../MapPicker/MapPicker";
import ShareMapPoll from "../ShareMapPoll/ShareMapPoll";

const MapPoll = () => {
  const [mapPoll, setMapPoll] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapId = useParams().mapPollId;

  useEffect(() => {
    getMapPollById(mapId).then((mapPoll) => {
      setMapPoll(mapPoll);
      setMapLoaded(true);
    });
  }, [mapId]);

  if (mapLoaded) {
    return (
      <>
        <h3>{mapPoll.question}</h3>
        <div className="col-lg-8 col-md-9 col-sm-11 mx-auto">
          <MapPicker mapLocation={mapPoll.mapLocation} mapId={mapId} />
        </div>
        <ShareMapPoll />
      </>
    );
  } else {
    return <div>Loading your poll...</div>;
  }
};

export default MapPoll;
