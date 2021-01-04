import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Login from "../login/login";
import Home from "../home/home";
import DataDiscovery from '../datadiscovery/discovery';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />                    
                    <Route path="/home" component={Home} />
                    <Route path="/data" component={DataDiscovery} />
                </Switch>
            </Router>
        )
    }
}