import React from "react";
import {Router, Route, Switch} from "react-router";
import {createBrowserHistory} from "history";

import Home from "../pages/home/Home";

const Routers = () => {
    let BrowserHistory = createBrowserHistory();

    return (
        <Router history={BrowserHistory}>
            <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
};

export default Routers;