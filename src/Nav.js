import React from 'react';
import App from './App';
import Champion from './Champion';
import Itens from './Itens';
import Summoners from './Summoners';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function Nav () {
    return (
        <Router>
        <div>
        <Switch>
        <Route path="/" exact component={App}/>
        <Route path="/champion/:id" component={Champion}/>
        <Route path="/itens/:id" component={Itens}/>
        <Route path="/summoners/:id" component={Summoners}/>
        </Switch>
        </div>
        </Router>
    );
}

export default Nav;