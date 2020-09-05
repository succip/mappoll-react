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
        <h3>Create a MapPoll</h3>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
              <div className="col-9 form-group">
                <label htmlFor="question">Poll Question</label>
                <input type="text" className="form-control" id="question" autoComplete="off" onChange={this.onQuestionChange} />
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
