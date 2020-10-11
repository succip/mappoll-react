import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import Dashboard from "../components/Dashboard";
import CreateMapPoll from "../components/CreateMapPoll";
import MapPoll from "../components/MapPoll";
import ShareMapPoll from "../components/ShareMapPoll";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={Dashboard} exact={true} />
          <Route path="/create" component={CreateMapPoll} />
          <Route path="/contact" component={Contact} />
          <Route path="/mp/:mapPollId" component={MapPoll} />
          <Route path="/share/:mapPollId" component={ShareMapPoll} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
