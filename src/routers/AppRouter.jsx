import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Browse from "../components/Browse/Browse";
import Contact from "../components/Contact/Contact";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateMapPoll from "../components/CreateMapPoll/CreateMapPoll";
import MapPoll from "../components/MapPoll/MapPoll";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Dashboard} exact={true} />
          <Route path="/create" component={CreateMapPoll} />
          <Route path="/browse" component={Browse} />
          <Route path="/contact" component={Contact} />
          <Route path="/mp/:mapPollId" component={MapPoll} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
