import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./Components/Auth/SignUp";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Components/Home/Home";
import MailBox from "./Components/MailBox/MailBox";
import MailContent from "./Components/MailBox/MailContent";
import Navigation from "./Components/Home/Navigation";
import MailDataToShow from "./Components/MailBox/MailDataToShow";
import { useSelector } from "react-redux";
function App() {
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/mail/:endpoint/:mailId" exact>
            {userLoggedIn && <MailBox />}
            {userLoggedIn && <MailDataToShow />}
          </Route>
          <Route path="/mail/:endpoint" exact>
            {userLoggedIn && <MailBox />}
            {userLoggedIn && <MailContent />}
          </Route>
          <Route path="/mail">{userLoggedIn && <MailBox />}</Route>
          <Route path="/home">
            <Navigation />
            {userLoggedIn ? <Home /> : <Redirect to="/" />}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            {userLoggedIn ? <Redirect to="/home" /> : <SignUp />}
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
