import React, { Component } from "react";
import { getMapPollById } from "../firebase/firebase";
import MapPicker from "../components/MapPicker";

class MapPoll extends Component {
  state = { mapId: "", question: "" };

  componentDidMount() {
    const mapId = this.props.match.params.mapPollId;
    getMapPollById(mapId).then((mapInfo) => {
      this.setState({
        mapId,
        question: mapInfo.question,
      });
    });
  }

  render() {
    return (
      <>
        <p>MapId: {this.state.mapId}</p>
        <h3>{this.state.question}</h3>
        <MapPicker message={"hello!"} />
      </>
    );
  }
}

export default MapPoll;
