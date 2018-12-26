
class IssueTable2 extends React.Component{
    render(){
        // const borderStyle = {border: "1px solid silver", padding: 6};
        // const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
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
                {this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)}
                {/*<IssueRow issue_id={1}*/}
                {/*issue_title={"Error when clicking Add"}/>*/}
                {/*<IssueRow issue_id={2}*/}
                {/*issue_title={"Miss bottom border"}/>*/}
                {/*<IssueRow issue_id={3}> Missing bottom <b>border</b> on pabel </IssueRow>*/}
                </tbody>
            </table>
        );
    }
}



class BorderWrap extends React.Component{
    render(){
        const borderStyle = {border: "1px solid silver", padding: 6};
        return(
            <div style={borderStyle}>
                {this.props.children}
            </div>
        );
    };
}

class IssueRow2 extends React.Component{

    render(){
        const borderStyle = {border: "1px solid silver", padding: 4};
        const issue = this.props.issue;
        // console.log('issue row rendered');
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.effort}</td>
                <td>{issue.completionDate ? issue.completionDate.toDateString() : "TBD"}</td>
                <td>{issue.title}</td>
            </tr>
        );
    }
}



const issues = [
    {
        id: 1,
        status: 'open',
        owner: 'Raven',
        created: new Date("2018-12-22"),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date("2018-12-23"),
        effort: 7,
        completionDate: new Date("2018-12-30"),
        title: 'Missing bottom border on panel',
    },
];