import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// import { Router } from 'react-router';
import { BrowserRouter as Router, Route , Switch, Redirect, withRouter} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

let contentNode = document.getElementById("content");
const NoMatch = () => <p> Page Not Found</p>;

const Header = () => (
    <div className="header">
        <h1>Issue Tracker</h1>
    </div>
);

const Footer = () => (
    <div className="footer">
        Full source code available at this
        <a href="https://github.com/vasansr/pro-mern-stack">
        GitHub repository</a>.
    </div>
);

const RoutedApp = () => (
    <Router>
        <div>
            <Route component={Header}/>
            <Switch>
                <Redirect exact from="/" to="/issues"/>
                <Route exact path="/issues" component={withRouter(IssueList)}/>
                <Route exact path="/issues/:id" component={IssueEdit} />
                <Route path="*" component={NoMatch} />
            </Switch>
            <Route component={Footer}/>
        </div>
    </Router>
);

ReactDOM.render(<RoutedApp/>, contentNode);

// ReactDOM.render(<IssueList/>, contentNode);

if (module.hot) {
    module.hot.accept();
}


