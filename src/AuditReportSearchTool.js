var ReactDOM = require('react-dom');
var React = require('react');
var _ = require('underscore');
var AuditReportFilters = require('./Filters/AuditReportFilters');
var AuditReportTable = require('./Table/AuditReportTable');
var AuditReportPaginate = require('./Paginate/AuditReportPaginate');
//CONSTANTS
var ITEMSPERPAGE = 10;

module.exports = React.createClass({
  display: 'AuditReportSearchTool',
  getInitialState: function() {
    return {
      audits: null,
      filteredAudits: null,
      filterSearchText: '',
      filterDeptSelect: '',
      filterReportNum: '',
      filterPubYearSelect: '',
      pageNum: 1
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({audits: data.data, filteredAudits: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  filterBySearchText: function(text) {
    this.setState({
      filterSearchText: text
    });
  },
  filterByDeptSelect: function(selectOption) {
    this.setState({
      filterDeptSelect: selectOption
    });
  },
  filterByPubYearSelect: function(selectOption) {
    this.setState({
      filterPubYearSelect: selectOption
    });
  },
  setFilteredAudits: function(filteredAudits){
    this.setState({
      filteredAudits:filteredAudits 
    });
  },
  setPageNum: function(num){
    this.setState({
      pageNum: num
    });
  },
  render: function() {
    var allAudits = this.state.audits;
    var filteredAudits = this.state.filteredAudits;
    var filterSearchText = this.state.filterSearchText;
    var filterDeptSelect = this.state.filterDeptSelect;
    var filterPubYearSelect = this.state.filterPubYearSelect;

    var pageNum = this.state.pageNum;

    var itemsPerPage = ITEMSPERPAGE;
    
    var auditItems = [];
    var depts = [];
    var pubYears = [];
    var auditSubset = [];
 
    // If filter is present, show filtered items
    if(filterSearchText || filterDeptSelect || filterPubYearSelect){

      allAudits.forEach(function(audit, i){
        // Search filter
        var lcName = audit.Project.toLowerCase();
        var lcFilterText = filterSearchText.toLowerCase();
        var keywords = audit.Keywords.toLowerCase();
        if (lcName.indexOf(lcFilterText) === -1 && keywords.indexOf(lcFilterText) === -1) {
          return;
        }

        // Department filter
        if(filterDeptSelect){
          if (audit.Dept.toLowerCase() !== filterDeptSelect.toLowerCase()) {
            return;
          }        
        }
        // Publish Year filter 
        if(filterPubYearSelect) {
          if (audit.Date_Published.slice(-4) !== filterPubYearSelect && audit.FollowUpDate.slice(-4) !== filterPubYearSelect ) {
            return;
          }
        }
        auditItems.push(audit);
      });
    } else {
      // Show all items
      auditItems = allAudits;
    }

    if (allAudits) {
      // Set department drop options
      allAudits.forEach(function(audit){
        depts.push(audit.Dept);
      });
      depts = _.uniq(depts).sort();

      // Set publish year drop options
      allAudits.forEach(function(audit){
        pubYears.push(audit.Date_Published.slice(-4));
        if(audit.FollowUpDate){
          pubYears.push(audit.FollowUpDate.slice(-4));
        }
      });
      pubYears = _.uniq(pubYears).sort(
        function(a,b){
          return b - a;
        });

      return (
        <div>
          <AuditReportFilters
            audits={auditItems}
            filteredAudits={filteredAudits}
            filterSearchText={filterSearchText}
            filterBySearchText={this.filterBySearchText}
            filterDeptSelect={filterDeptSelect}
            depts={depts}
            filterByDeptSelect={this.filterByDeptSelect}
            pubYears={pubYears}
            filterPubYearSelect={filterPubYearSelect}
            filterByPubYearSelect={this.filterByPubYearSelect}
            setPageNum={this.setPageNum}
             />
          <AuditReportTable 
            itemsPerPage={itemsPerPage}
            audits={auditItems}
            pageNum={pageNum}
            filterSearchText={filterSearchText}
            filterDeptSelect={filterDeptSelect}
            filterPubYearSelect={filterPubYearSelect}
            setFilteredAudits={this.setFilteredAudits}  />
          <AuditReportPaginate
            itemsPerPage={itemsPerPage} 
            audits={auditItems}
            filteredAudits={filteredAudits}
            setPageNumIndex={this.setPageNum}
            increasePageNum={this.setPageNum} 
            decreasePageNum={this.setPageNum} 
            pageNum={pageNum} />
        </div>
        
      );
    }
    return (<div id="auditor-search"><form > <div className="row"> <div className="col-sm-6"> <div className="form-group"> <label for="ar-search">Search</label> <input id="ar-search" type="text" placeholder="Type title or keywords" className="form-control" disabled /> </div></div></div><div className="row"> <div className="col-sm-12"> <p style={{borderBottom: "1px dotted #000"}}>FILTER BY:</p></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-report-num">Report #</label> <input id="ar-filter-report-num" type="text" placeholder="6 digits" className="form-control" disabled /> </div></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-status">Status</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-pub-year">Published year</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div><div className="col-sm-8"> <label for="ar-filter-dept">Department</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div></form> <div id="audit-reports-results"> <div> <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span> <span className="sr-only">Loading...</span> </div></div></div>)
  }
});