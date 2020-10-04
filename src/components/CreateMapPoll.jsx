import React, { Component } from "react";
import MapBuilder from "./MapBuilder";
import { pushMapPoll } from "../firebase/firebase";

class CreateMapPoll extends Component {
  state = {
    question: "",
    mapProps: {
      lng: 0,
      lat: 0,
      zoom: 0,
    },
  };

  handleMapProps = (mapProps) => {
    this.setState({ ...this.state, mapProps });
  };

  onQuestionChange = (e) => {
    const question = e.target.value;
    this.setState(() => ({ ...this.state, question }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const newPollId = await pushMapPoll({ ...this.state });
    this.props.history.push("/share/" + newPollId);
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <p class="h3">Create a MapPoll</p>

          <form onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
              <div className="col-9 form-group">
                <label htmlFor="question">Poll Title</label>
                <input type="text" className="form-control text-center" id="question" autoComplete="off" placeholder="Type your poll question here" onChange={this.onQuestionChange} />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-11">
                <h3>{this.state.question}</h3>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-11">
                <MapBuilder onMapChange={this.handleMapProps} />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-10">
                <button className="btn btn-primary m-1">Create Poll</button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateMapPoll;
