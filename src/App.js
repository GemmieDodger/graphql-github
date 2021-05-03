import React from 'react';
import './App.css';
// import fetchGraphQL from './fetchGraphQL';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserDetail from './views/UserDetail';
import Profile from './views/Profile';


// EXPLORER: https://docs.github.com/en/graphql/overview/explorer
//repository(owner: "gemmiedodger" name: "boathook") {
 // name
//}
function App() {
return(
  <Router>
          <Switch>
            <Route exact path="/">
              <Profile /> 
            </Route>
            <Route exact path="/UserDetail">
              <UserDetail />
            </Route>
          </Switch>
  </Router>
  )
}

export default App;