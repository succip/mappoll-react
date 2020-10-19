import React from "react";

const SeeResultsButton = () => {
  return (
    <>
      <button className="btn btn-primary float-right position-absolute" onClick={() => console.log("button tested")}>
        See Results
      </button>
    </>
  );
};

export default SeeResultsButton;
