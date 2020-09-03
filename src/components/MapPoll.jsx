import React, { Component } from "react";
import { getMapPollById } from "../firebase/firebase";
import MapPicker from "../components/MapPicker";

class MapPoll extends Component {
  state = {
    mapId: "",
    question: "",
    mapProps: {
      lng: 0,
      lat: 0,
      zoom: 0,
    },
  };

  componentDidMount() {
    const mapId = this.props.match.params.mapPollId;
    getMapPollById(mapId).then((mapPoll) => {
      console.log(mapPoll);
      this.setState({
        mapId,
        ...mapPoll,
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
