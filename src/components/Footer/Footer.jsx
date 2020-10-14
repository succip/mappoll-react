import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <hr />
      <div>
        <p className="text-muted">
          This is still very much a work in progress. To report bugs, suggest features, or just tell me how your day's going,{" "}
          <a href="/contact">get in touch</a>
          . <br />
          Patent Pending no stealsies.
        </p>
      </div>
    </React.Fragment>
  );
};

export default Footer;
