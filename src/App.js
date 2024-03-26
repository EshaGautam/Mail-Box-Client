import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./Components/Auth/SignUp";
import { Redirect,  } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import Home from "./Components/Home/Home";
import MailBox from './Components/MailBox/MailBox'
import MailContent from "./Components/MailBox/MailContent";
import Navigation from "./Components/Home/Navigation";
import MailDataToShow from "./Components/MailBox/MailDataToShow";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchMail } from "./Components/Store/MailDataSlice";
function App() {
  const dispatch = useDispatch()
  const userLoggedIn = useSelector(state=>state.auth.userLoggedIn)
  
 
  return (
    <>
      <Router>
        <Switch>
        <Route path="/mail/:endpoint/:mailId" exact>
            <MailBox/>
            <MailDataToShow/>
          </Route>
          <Route path="/mail/:endpoint" exact>
           <MailBox />
           <MailContent/>
          </Route>
          <Route path="/mail">
            <MailBox />
          </Route>
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
