import React from "react";
require("bootstrap");

const Header = () => {
  return (
    <React.Fragment>
      <header className="mb-3">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <a className="navbar-brand" href="/">MapPoll</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/create">Create <span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="/create">Browse</a>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
