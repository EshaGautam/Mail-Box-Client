import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import authContext from "./Components/Store/Context";
import SignUp from "./Components/Auth/SignUp";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Components/Auth/Home/Home";

function App() {
   const authCtx = useContext(authContext);
   const { userLoggedIn } = authCtx;
  return (
    <Router>
      <Switch>
        <Route path="/home">
          {userLoggedIn ? <Home /> : <Redirect to="/" />}
        </Route>
        <Route path="/">{userLoggedIn ? <Home /> : <SignUp />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
