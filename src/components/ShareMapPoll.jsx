import React, { Component } from "react";
import { BiCopy } from "react-icons/bi";

class ShareMapPoll extends Component {
  state = { mapPollId: this.props.match.params.mapPollId };

  componentDidMount() { }

  copyShareLinkToClipboard = () => {
    const url = window.location.href;
    const urlDomain = url.replace("http://", "").replace("https://", "").split(/[/?#]/)[0];
    const shareLink = `${urlDomain}/mappoll/${this.state.mapPollId}`;
    const dummyElement = document.createElement("textarea");
    document.body.appendChild(dummyElement);
    dummyElement.value = shareLink;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <h4>Your MapPoll is ready!</h4>
        </div>
        <div className="row justify-content-center">
          <h3>
            <a href={`/mappoll/` + this.state.mapPollId}>mappoll.com/mappoll/{this.state.mapPollId} </a>
          </h3>
          <button className="ml-3 btn btn-outline-primary btn-sm" onClick={this.copyShareLinkToClipboard}>
            Copy <BiCopy />
          </button>
        </div>
        <h4 className="mt-3 text-secondary">Share this link with your friends to start polling!</h4>
      </div>
    );
  }
}

export default ShareMapPoll;
