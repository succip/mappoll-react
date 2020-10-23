import React from "react";

const SeeResultsButton = ({ handleResults }) => {
  return (
    <>
      <button onClick={() => handleResults()} className="btn btn-primary float-right resultsButton">
        See Results
      </button>
    </>
  );
};
export default SeeResultsButton;
