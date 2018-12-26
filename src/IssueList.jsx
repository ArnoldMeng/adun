import React from 'react';
// import 'whatwg-fetch';

import IssueAdd from "./IssueAdd.jsx";
import IssueFilter from "./IssueFilter.jsx";

const IssueRow = (props) => (
    <tr>
        <td>{props.issue._id}</td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{props.issue.created.toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : "TBD"}</td>
        <td>{props.issue.title}</td>
    </tr>
);


// IssueRow.propTypes = {
//     issue_id: React.PropTypes.number,
//     issue_title: React.PropTypes.string,
// };
IssueRow.defaultProps = {
    issue_title: 'Title Not Found'
};

const IssueTable = (props) => {
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue}/>);
    return (
        <table className={"bordered-table"}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Effort</th>
                <th>Completion Date</th>
                <th>Title</th>
            </tr>
            </thead>
            <tbody>
            {issueRows}
            </tbody>
        </table>
    );
};


export  default class IssueList extends React.Component{
    constructor(){
        super();
        this.state = {issues: []};
        // setTimeout(this.createTestIssue.bind(this), 2000);
        this.createIssue = this.createIssue.bind(this);
    }
    loadData(){
        fetch('/api/v1/issues').then(res => {
            if(res.ok){
                res.json().then(data => {
                    console.log("record count: ",data._metadata.total_count);
                    data.records.forEach(issue => {
                        issue.created = new Date(issue.created);
                        if(issue.completionDate){
                            issue.completionDate = new Date(issue.completionDate);
                        }
                    });
                    this.setState({issues: data.records});
                });
            } else {
                res.json().then(err => {
                    alert(`Failed to fetch issues: ${err.message}`);
                });
            }
        }).catch(err => {
            alert("Error in fetching data from server:" + err);
        });

        // fetch('/api/v1/issues').then(response => response.json()
        // ).then(data => {
        //     console.log("record count: ",data._metadata.total_count);
        //     data.records.forEach(issue => {
        //         issue.created = new Date(issue.created);
        //         if(issue.completionDate){
        //             issue.completionDate = new Date(issue.completionDate);
        //         }
        //     });
        //     this.setState({issues: data.records});
        // }).catch(err => console.log(err));

        // setTimeout(() => {
        //     this.setState({issues: issues});
        // }, 500);
    }
    componentDidMount(){
        this.loadData();
    }
    createIssue(newIssue){
        fetch('/api/v1/issues', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newIssue),
        }).then(res => {
            if(res.ok){
                return res.json().then(updatedIssue => {
                    updatedIssue.created = new Date(updatedIssue.created);
                    if(updatedIssue.completionDate){
                        updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                    }
                    const newIssues = this.state.issues.concat(updatedIssue);
                    this.setState({issues: newIssues});
                })
            } else {
                return res.json().then(err => {
                    alert(`Failed to add issue: ${err.message}`);
                });
            }
        }).catch(err => alert("error in sending data, " + err.message)
        );
    }
    createTestIssue(){
        this.createIssue({
            status: 'New',
            owner: 'Peta',
            created: new Date(),
            title: 'Completion date should be optional',
        });
    }
    render(){
        return (
            <div>
                <hr/>
                <h1> Issue Tracker</h1>
                <IssueFilter/>
                <hr/>
                <IssueTable issues={this.state.issues}/>
                <button onClick={()=>{this.createTestIssue();}}>Add</button>
                <hr/>
                <IssueAdd createIssue={this.createIssue}/>
            </div>
        );
    }
}