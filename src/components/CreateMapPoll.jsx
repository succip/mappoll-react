import React, { Component } from "react";
import MapBuilder from "./MapBuilder";
import { pushMapPoll } from "../firebase/firebase";

class CreateMapPoll extends Component {
  state = { question: "" };

  onQuestionChange = (e) => {
    const question = e.target.value;
    this.setState(() => ({ question }));
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const newPollId = await pushMapPoll({ question: this.state.question });
    this.props.history.push("/share/" + newPollId);
  };

  render() {
    return (
      <>
        <h3>Create a MapPoll</h3>
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <div className="row justify-content-center">
              <div className="col-6 form-group">
                <label htmlFor="question">Poll Question</label>
                <input type="text" className="form-control" id="question" autoComplete="off" onChange={this.onQuestionChange} />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-10">
                <MapBuilder lng={-113.117932} />
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-10">
                <button className="btn btn-primary m-1">Create Poll</button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CreateMapPoll;
