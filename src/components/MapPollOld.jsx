import React, { Component } from "react";
import { getMapPollById } from "../firebase/firebase";
import MapPicker from "./MapPicker";
import ShareMapPoll from "../components/ShareMapPoll";

class MapPoll extends Component {
  state = {
    mapId: "",
    question: "",
    mapProps: {
      lng: 0,
      lat: 0,
      zoom: 0,
    },
    isLoading: true,
  };

  componentDidMount() {
    const mapId = this.props.match.params.mapPollId;
    getMapPollById(mapId).then((mapPoll) => {
      this.setState({
        mapId,
        ...mapPoll,
        isLoading: false,
      });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading your poll...</div>;
    }

    return (
      <>
        <h3>{this.state.question}</h3>
        <MapPicker mapInfo={this.state} />
        <ShareMapPoll />
      </>
    );
  }
}

export default MapPoll;
