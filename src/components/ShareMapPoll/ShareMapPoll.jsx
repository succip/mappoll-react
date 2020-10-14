import React from "react";
import { BiCopy } from "react-icons/bi";

const ShareMapPoll = () => {
  const copyShareLinkToClipboard = () => {
    const shareLink = window.location.href;
    const dummyElement = document.createElement("textarea");
    document.body.appendChild(dummyElement);
    dummyElement.value = shareLink;
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
  };

  return (
    <div className="d-inline-flex mt-3 p-2 border rounded border-secondary">
      <div className="d-block">
        <p>Share this MapPoll with your friends:</p>
        <p>
          <a href={window.location.href}>{window.location.href}</a>
          <button className="ml-2 btn btn-outline-primary btn-sm" onClick={copyShareLinkToClipboard}>
            <BiCopy /> Copy
          </button>
        </p>
      </div>
    </div>
  );
};

export default ShareMapPoll;
