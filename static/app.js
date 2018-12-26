'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = require('./IssueAdd.jsx');

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from 'react';
// import PropTypes from 'prop-types';


var contentNode = document.getElementById("content");
var HelloWorld = React.createElement(
    'h1',
    null,
    ' Good morning, my lord! '
);

ReactDOM.render(HelloWorld, contentNode);

var issues = [{
    id: 1,
    status: 'open',
    owner: 'Raven',
    created: new Date("2018-12-22"),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when clicking Add'
}, {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date("2018-12-23"),
    effort: 7,
    completionDate: new Date("2018-12-30"),
    title: 'Missing bottom border on panel'
}];

var IssueFilter = function (_React$Component) {
    _inherits(IssueFilter, _React$Component);

    function IssueFilter() {
        _classCallCheck(this, IssueFilter);

        return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
    }

    _createClass(IssueFilter, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                ' This is a placeholder for the issue filter.'
            );
        }
    }]);

    return IssueFilter;
}(React.Component);

var IssueRow = function IssueRow(props) {
    return React.createElement(
        'tr',
        null,
        React.createElement(
            'td',
            null,
            props.issue._id
        ),
        React.createElement(
            'td',
            null,
            props.issue.status
        ),
        React.createElement(
            'td',
            null,
            props.issue.owner
        ),
        React.createElement(
            'td',
            null,
            props.issue.created.toDateString()
        ),
        React.createElement(
            'td',
            null,
            props.issue.effort
        ),
        React.createElement(
            'td',
            null,
            props.issue.completionDate ? props.issue.completionDate.toDateString() : "TBD"
        ),
        React.createElement(
            'td',
            null,
            props.issue.title
        )
    );
};

var IssueRow2 = function (_React$Component2) {
    _inherits(IssueRow2, _React$Component2);

    function IssueRow2() {
        _classCallCheck(this, IssueRow2);

        return _possibleConstructorReturn(this, (IssueRow2.__proto__ || Object.getPrototypeOf(IssueRow2)).apply(this, arguments));
    }

    _createClass(IssueRow2, [{
        key: 'render',
        value: function render() {
            var borderStyle = { border: "1px solid silver", padding: 4 };
            var issue = this.props.issue;
            // console.log('issue row rendered');
            return React.createElement(
                'tr',
                null,
                React.createElement(
                    'td',
                    null,
                    issue.id
                ),
                React.createElement(
                    'td',
                    null,
                    issue.status
                ),
                React.createElement(
                    'td',
                    null,
                    issue.owner
                ),
                React.createElement(
                    'td',
                    null,
                    issue.created.toDateString()
                ),
                React.createElement(
                    'td',
                    null,
                    issue.effort
                ),
                React.createElement(
                    'td',
                    null,
                    issue.completionDate ? issue.completionDate.toDateString() : "TBD"
                ),
                React.createElement(
                    'td',
                    null,
                    issue.title
                )
            );
        }
    }]);

    return IssueRow2;
}(React.Component);
// IssueRow.propTypes = {
//     issue_id: React.PropTypes.number,
//     issue_title: React.PropTypes.string,
// };


IssueRow.defaultProps = {
    issue_title: 'Title Not Found'
};

var BorderWrap = function (_React$Component3) {
    _inherits(BorderWrap, _React$Component3);

    function BorderWrap() {
        _classCallCheck(this, BorderWrap);

        return _possibleConstructorReturn(this, (BorderWrap.__proto__ || Object.getPrototypeOf(BorderWrap)).apply(this, arguments));
    }

    _createClass(BorderWrap, [{
        key: 'render',
        value: function render() {
            var borderStyle = { border: "1px solid silver", padding: 6 };
            return React.createElement(
                'div',
                { style: borderStyle },
                this.props.children
            );
        }
    }]);

    return BorderWrap;
}(React.Component);

var IssueTable = function IssueTable(props) {
    var issueRows = props.issues.map(function (issue) {
        return React.createElement(IssueRow, { key: issue._id, issue: issue });
    });
    return React.createElement(
        'table',
        { className: "bordered-table" },
        React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    null,
                    'ID'
                ),
                React.createElement(
                    'th',
                    null,
                    'Status'
                ),
                React.createElement(
                    'th',
                    null,
                    'Owner'
                ),
                React.createElement(
                    'th',
                    null,
                    'Created'
                ),
                React.createElement(
                    'th',
                    null,
                    'Effort'
                ),
                React.createElement(
                    'th',
                    null,
                    'Completion Date'
                ),
                React.createElement(
                    'th',
                    null,
                    'Title'
                )
            )
        ),
        React.createElement(
            'tbody',
            null,
            issueRows
        )
    );
};

var IssueTable2 = function (_React$Component4) {
    _inherits(IssueTable2, _React$Component4);

    function IssueTable2() {
        _classCallCheck(this, IssueTable2);

        return _possibleConstructorReturn(this, (IssueTable2.__proto__ || Object.getPrototypeOf(IssueTable2)).apply(this, arguments));
    }

    _createClass(IssueTable2, [{
        key: 'render',
        value: function render() {
            // const borderStyle = {border: "1px solid silver", padding: 6};
            // const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
            return React.createElement(
                'table',
                { className: "bordered-table" },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            'ID'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Status'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Owner'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Created'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Effort'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Completion Date'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Title'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.props.issues.map(function (issue) {
                        return React.createElement(IssueRow, { key: issue.id, issue: issue });
                    })
                )
            );
        }
    }]);

    return IssueTable2;
}(React.Component);

var IssueList = function (_React$Component5) {
    _inherits(IssueList, _React$Component5);

    function IssueList() {
        _classCallCheck(this, IssueList);

        var _this5 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

        _this5.state = { issues: [] };
        // setTimeout(this.createTestIssue.bind(this), 2000);
        _this5.createIssue = _this5.createIssue.bind(_this5);
        return _this5;
    }

    _createClass(IssueList, [{
        key: 'loadData',
        value: function loadData() {
            var _this6 = this;

            fetch('/api/v1/issues').then(function (res) {
                if (res.ok) {
                    res.json().then(function (data) {
                        console.log("record count: ", data._metadata.total_count);
                        data.records.forEach(function (issue) {
                            issue.created = new Date(issue.created);
                            if (issue.completionDate) {
                                issue.completionDate = new Date(issue.completionDate);
                            }
                        });
                        _this6.setState({ issues: data.records });
                    });
                } else {
                    res.json().then(function (err) {
                        alert('Failed to fetch issues: ' + err.message);
                    });
                }
            }).catch(function (err) {
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
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadData();
        }
    }, {
        key: 'createIssue',
        value: function createIssue(newIssue) {
            var _this7 = this;

            fetch('/api/v1/issues', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newIssue)
            }).then(function (res) {
                if (res.ok) {
                    return res.json().then(function (updatedIssue) {
                        updatedIssue.created = new Date(updatedIssue.created);
                        if (updatedIssue.completionDate) {
                            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
                        }
                        var newIssues = _this7.state.issues.concat(updatedIssue);
                        _this7.setState({ issues: newIssues });
                    });
                } else {
                    return res.json().then(function (err) {
                        alert('Failed to add issue: ' + err.message);
                    });
                }
            }).catch(function (err) {
                return alert("error in sending data, " + err.message);
            });

            // }).then(updatedIssue => {
            //     updatedIssue.created = new Date(updatedIssue.created);
            //     if(updatedIssue.completionDate){
            //         updatedIssue.completionDate = new Date(updatedIssue.completionDate);
            //     }
            //     const newIssues = this.state.issues.concat(updatedIssue);
            //     this.setState({issues: newIssues});
            // const newIssues = this.state.issues.slice();
            // newIssue.id = this.state.issues.length + 1;
            // newIssues.push(newIssue);
            // this.setState({issues: newIssues});
        }
    }, {
        key: 'createTestIssue',
        value: function createTestIssue() {
            this.createIssue({
                status: 'New',
                owner: 'Peta',
                created: new Date(),
                title: 'Completion date should be optional'
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            return React.createElement(
                'div',
                null,
                React.createElement('hr', null),
                React.createElement(
                    'h1',
                    null,
                    ' Issue Tracker'
                ),
                React.createElement(IssueFilter, null),
                React.createElement('hr', null),
                React.createElement(IssueTable, { issues: this.state.issues }),
                React.createElement(
                    'button',
                    { onClick: function onClick() {
                            _this8.createTestIssue();
                        } },
                    'Add'
                ),
                React.createElement('hr', null),
                React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
            );
        }
    }]);

    return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode);