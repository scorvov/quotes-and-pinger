import React from "react";
import { Route, Switch } from "react-router";
import { PingPage, QuotesPage } from "./components/pages";
import "./styles/app.css";
import { Navigation } from "./components/navigation";

function App() {
  return (
    <div className="container-app">
      <Navigation />
      <Switch>
        <Route exact path={"/quotes"} component={QuotesPage} />
        <Route exact path={"/ping"} component={PingPage} />
      </Switch>
    </div>
  );
}

export default App;
