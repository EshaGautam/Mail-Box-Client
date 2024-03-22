import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import authContext from "./Components/Store/Context";
import SignUp from "./Components/Auth/SignUp";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Components/Home/Home";
import MailBox from './Components/MailBox/MailBox'
import MailContent from "./Components/MailBox/MailContent";
import Navigation from "./Components/Home/Navigation";
import ComposeMail from "./Components/MailBox/ComposeMail";

function App() {
   const authCtx = useContext(authContext);
   const { userLoggedIn, visibleMail } = authCtx;
    

 
  return (
    <>
      <Router>
        <Switch>
          <Route path="/mail/:endpoint" exact>
            <MailBox />
            {visibleMail&&<ComposeMail/>}
          </Route>
          <Route path="/mail">
            <MailBox />
          </Route>
          <Route path="/home">
            <Navigation />
            {userLoggedIn ? <Home /> : <Redirect to="/" />}
          </Route>
          <Navigation />
          <Route path="/">{userLoggedIn ? <Home /> : <SignUp />}</Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
