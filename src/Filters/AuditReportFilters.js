var ReactDOM = require('react-dom');
var React = require('react');
var SearchFilter = require('./SearchFilter');
var DepartmentFilter = require('./DepartmentFilter');
//var ReportFilter = require('./ReportNumFilter');
var PublishYearFilter = require('./PublishYearFilter');

module.exports = React.createClass({
  displayName: 'AuditReportFilter',
  render: function(){
    var audits = this.props.audits;
    return (
      <div>
        <SearchFilter 
          setPageNum={this.props.setPageNum} 
          filterBySearchText={this.props.filterBySearchText} 
          filterSearchText={this.props.filterSearchText}/>
        <div className="row">
          <div className="col-sm-12">
            <p style={{borderBottom: '1px dotted #000'}}>FILTER BY:</p>
          </div>
          <PublishYearFilter 
            pubYears={this.props.pubYears}
            filterPubYearSelect={this.props.filterPubYearSelect}
            filterByPubYearSelect={this.props.filterByPubYearSelect}
            setPageNum={this.props.setPageNum}
          />
          <DepartmentFilter
            depts={this.props.depts}
            filterDeptSelect={this.props.filterDeptSelect}
            filterByDeptSelect={this.props.filterByDeptSelect} 
            setPageNum={this.props.setPageNum}
          />
        </div>
      </div>
    );
  }
});