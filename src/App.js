import React from "react";
import { Route, Switch } from "react-router";
import { PingPage, QuotesPage } from "./components/pages";
import "./styles/app.css";

function App() {
  return (
    <div className="container-app">
      <Switch>
        <Route path={"/quotes"} component={QuotesPage} />
        <Route path={"/ping"} component={PingPage} />
      </Switch>
    </div>
  );
}

export default App;
