import react from "react";
import {Switch, Route} from "react-router-dom";
import Landing from './components/Landing/Landing'
import LoginSignUp from './components/LoginSignUp/LoginSignUp'
import Results from './components/Results/Results'
import Playlist from './components/Playlist/Playlist'

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/login" component={LoginSignUp} />
    <Route path="/results" component={Results} />
    <Route path="/playlist" component={Playlist} />
  </Switch>
);
