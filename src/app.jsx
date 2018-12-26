import React from 'react';
import ReactDOM from 'react-dom';
import IssueList from './IssueList.jsx';

let contentNode = document.getElementById("content");
let HelloWorld = <h1> Good morning, my lord! </h1>;

ReactDOM.render(
    HelloWorld
    , contentNode
);



ReactDOM.render(<IssueList/>, contentNode);

if (module.hot) {
    module.hot.accept();
}


