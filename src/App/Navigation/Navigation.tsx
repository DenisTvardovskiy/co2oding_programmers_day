import React from "react";
import "./style.scss"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "../Components/Home/Home";
import Distribution from "../Components/Distribution/Distribution";

class Navigation extends React.Component<any, any>{

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/distribution">Distribution</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/distribution">
                            <Distribution/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navigation