import React, { Component } from "react";

class ShareMapPoll extends Component {
  state = {};
  mapPollId = this.props.match.params.mapPollId;
  render() {
    return (
      <>
        <h4>Your MapPoll is ready!</h4>
        <p>It can be found here: </p>
        <h3>
          <a href={`/mappoll/` + this.mapPollId}>mappoll.com/{this.mapPollId} </a>
        </h3>
        <p>Share this link with your friends to start polling.</p>
      </>
    );
  }
}

export default ShareMapPoll;
