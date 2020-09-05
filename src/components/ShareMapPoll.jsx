import React, { Component } from "react";

class ShareMapPoll extends Component {
  state = { mapPollId: this.props.match.params.mapPollId };

  copyToClipboard = () => {
    const shareLink = `localhost:3000/mappoll/${this.state.mapPollId}`
    const el = document.createElement('textarea');
    document.body.appendChild(el);
    el.value = shareLink;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h4>Your MapPoll is ready!</h4>
        </div>
        <div className="row justify-content-center">
          <p>It can be found here: </p>
        </div>
        <div className="row justify-content-center">
          <h3>
            <a href={`/mappoll/` + this.state.mapPollId}>mappoll.com/{this.state.mapPollId} </a>
          </h3>
          <button className="ml-3 btn btn-outline-primary btn-sm" onClick={this.copyToClipboard}>
            Copy Link
          </button>
        </div>
        <h4 className="mt-3 text-secondary">Share this link with your friends to start polling!</h4>
      </div>
    );
  }
}

export default ShareMapPoll;
