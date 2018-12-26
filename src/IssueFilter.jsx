import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

export default class IssueFilter extends React.Component{
    constructor(){
        super();
        this.setStatusFilter = this.setStatusFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.setFilterOpen = this.setFilterOpen.bind(this);
        this.setFilterAssigned = this.setFilterAssigned.bind(this);
    }
    setFilterAssigned(e) {
        e.preventDefault();
        this.props.setFilter({ status: 'Assigned' });
    }
    setFilterOpen(e) {
        e.preventDefault();
        this.props.setFilter({ status: 'open' });
    }
    clearFilter(e) {
        e.preventDefault();
        this.props.setFilter({});
    }
    setStatusFilter(e, status){
        e.preventDefault();
        const query = status === null ? {} : {status};
        this.props.setFilter(queryString.stringify(query));
    }
    render(){
        const Separator = () => <span> | </span>;
        return (
            <div>
                <a href="#" onClick={this.clearFilter}>All Issues</a>
                <Separator />
                <a href="#" onClick={this.setFilterOpen}>Open Issues</a>
                <Separator />
                <a href="#" onClick={this.setFilterAssigned}>Assigned Issues</a>
            </div>
        );
    }
}