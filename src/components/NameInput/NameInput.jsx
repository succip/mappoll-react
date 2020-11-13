import React from "react";

const NameInput = ({ handleNameChange }) => {
  return (
    <>
      <input className="mb-2" onChange={(e) => handleNameChange(e.target.value)} autoComplete="off" placeholder="Your Name (Optional)" type="text" />
    </>
  );
};

export default NameInput;
