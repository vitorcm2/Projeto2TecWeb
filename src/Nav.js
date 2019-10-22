import React from 'react';
import App from './App';
import Champion from './Champion';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function Nav () {
    return (
        <Router>
        <div>
        <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/champion" component={Champion}/>
        </Switch>
        </div>
        </Router>
    );
}

export default Nav;