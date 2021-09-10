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
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="co2oding_programmers_day/">Home</Link>
                            </li>
                            <li>
                                <Link to="co2oding_programmers_day/distribution">Distribution</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="co2oding_programmers_day/distribution">
                            <Distribution/>
                        </Route>
                        <Route path="co2oding_programmers_day/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navigation