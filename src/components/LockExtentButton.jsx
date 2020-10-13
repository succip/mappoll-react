import React from "react";
import { BsUnlock, BsLock } from "react-icons/bs";

const LockExtentButton = ({ handleExtentLocked, extentLocked }) => {
  return (
    <React.Fragment>
      <button onClick={() => handleExtentLocked(!extentLocked)} id="lock" className="btn btn-light float-left">
        {extentLocked ? <BsLock /> : <BsUnlock />}
        {extentLocked ? " Unlock Boundary" : " Lock Boundary"}
      </button>
    </React.Fragment>
  );
};

export default LockExtentButton;
