var AuditReportResultsItem = React.createClass({
  render: function(){
    var reportType = this.props.report.type;
    var reportDate = this.props.report.date;
    return (
      <p><strong>{reportType}</strong>: {reportDate}</p>
    );
  }
});

var AuditReportResultsSection = React.createClass({
  render: function(){
    var reportItems = [];
    var reports = this.props.audit.reports;
    var dept = this.props.audit.department;
    var auditName = this.props.audit.name;

    reports.forEach(function(report, i){
      reportItems.push(<AuditReportResultsItem key={i} report={report} />)
    });
    return (
      <div className="audit-report-item">
        <p><a href="">{auditName}</a></p>
        <p>{dept}</p>
        {reportItems} 
      </div>
    );
  }
});

var AuditReportTable = React.createClass({
  render: function(){
    var auditItems = [];
    var audits = this.props.audits;

    var filterSearchText = this.props.filterSearchText;
    var filterDeptSelect = this.props.filterDeptSelect;

    audits.forEach(function(audit, i){
      var lcName = audit.name.toLowerCase();
      var lcFilterText = filterSearchText.toLowerCase();

      if (lcName.indexOf(lcFilterText) === -1) {
        return;
      }
      //Check for empty select
      if(filterDeptSelect){
        if (audit.department.toLowerCase() !== filterDeptSelect.toLowerCase()) {
          return;
        }        
      }
      auditItems.push(<AuditReportResultsSection key={i} audit={audit} />)
    }.bind(this));

    //Check for empty array and display error
    if(auditItems === undefined || auditItems.length == 0) {
        auditItems.push(<div>Sorry</div>)
    }
    return (
      <div className="audit-reports-results">
        {auditItems}
      </div>
    );
  }
});

var DepartmentFilter = React.createClass({
  filterByDeptSelectChange: function(evt) {
    this.props.filterByDeptSelect(evt.target.value)
  },
  render: function(){
    var deptsList = [];
    var uniqDeptsList = [];
    var deptsListItems = [] 

    this.props.audits.forEach(function(audit){
      deptsList.push(audit.department);
    });
    uniqDeptsList = _.uniq(deptsList);

    uniqDeptsList.forEach(function(dept, i){
      deptsListItems.push(<option key={i} value={dept.toLowerCase()}>{dept}</option>)
    });
    
    return (
      <div className="col-sm-8">
        <label for="ar-filter-dept">Department</label>
        <select onChange={this.filterByDeptSelectChange} className="form-control">
            <option value="">--Show all--</option>
            {deptsListItems}
        </select>
      </div>
    )
  }
});



var AuditReportFilters = React.createClass({
  render: function(){
    var filterSearchText = this.props.filterSearchText;
    var audits = this.props.audits;
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <SearchFilter filterSearchText={filterSearchText} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <p style={{borderBottom: '1px dotted #000'}}>FILTER BY:</p>
          </div>
          <OtherFilters />
          <DepartmentFilter
            ref="filterDeptSelect" 
            audits={audits} 
            filterDeptSelect={this.props.filterDeptSelect}
            filterByDeptSelect={this.props.filterByDeptSelect} 
          />
        </div>
      </div>
    );
  }
});

var AuditReportSearchTool = React.createClass({
  getInitialState: function() {
    return {
      audits: null,
      filterSearchText: '',
      filterDeptSelect: ''
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({audits: data});
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
  render: function() {
    var audits = this.state.audits;
    var filterSearchText = this.state.filterSearchText;
    var filterDeptSelect = this.state.filterDeptSelect;
    if (this.state.audits) {
      return (
        <div>
          <AuditReportFilters
            audits={audits}
            filterSearchText={filterSearchText}
            filterBySearchText={this.filterBySearchText}
            filterDeptSelect={filterDeptSelect}
            filterByDeptSelect={this.filterByDeptSelect} />
          <AuditReportTable 
            audits={audits}
            filterSearchText={filterSearchText}
            filterDeptSelect={filterDeptSelect}
            filterByDeptSelect={this.filterByDeptSelect} />
        </div>
        
      );
    }
    return (<div id="auditor-search"><form > <div className="row"> <div className="col-sm-6"> <div className="form-group"> <label for="ar-search">Search</label> <input id="ar-search" type="text" placeholder="Type title or keywords" className="form-control" disabled /> </div></div></div><div className="row"> <div className="col-sm-12"> <p style={{borderBottom: "1px dotted #000"}}>FILTER BY:</p></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-report-num">Report #</label> <input id="ar-filter-report-num" type="text" placeholder="6 digits" className="form-control" disabled /> </div></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-status">Status</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div><div className="col-sm-4"> <div className="form-group"> <label for="ar-filter-pub-year">Published year</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div><div className="col-sm-8"> <label for="ar-filter-dept">Department</label> <select className="form-control" disabled> <option>--Show all--</option> </select> </div></div></form> <div id="audit-reports-results"> <div> <span className="fa fa-spinner fa-spin fa-3x fa-fw"></span> <span className="sr-only">Loading...</span> </div></div></div>)
  }
});

var REPORTS = [
  { name: 'Audit: Opportunities to improve family and medical leave administration', department: 'Department of Executive Services', reports: [{date: 'February 18, 2015', type: 'Report'}, {date: 'February 10, 2016', type: 'Follow-up report'}]},
  { name: 'Audit: In-River Projects: More systematic focus needed on risk and lessons learned', department: 'Department of Natural Resources and Parks (DNRP)', reports: [{date: 'June 9, 2015', type: 'Report'}]},
  { name: 'Audit: King County 911 System: Governance structure and plan needed to move forward', department: 'Department of Executive Services', reports: [{date: 'June 23, 2015', type: 'Report'}]},
  { name: 'Audit: Driving prices in Seattle home market', department: 'Department of Housing', reports: [{date: 'August 3, 2014', type: 'Report'}, {date: 'September 20, 2014', type: 'Follow-up Report'}]},
  { name: 'Audit: Health Services for Residents', department: 'Department of Health', reports: [{date: 'January 1, 2015', type: 'Report'},{date: 'February 1, 2015', type: 'Follow-up Report'},{date: 'March 1, 2015', type: 'Follow-up Report'}]},
  { name: 'Audit: How to find mushrooms', department: 'Mushroom Department', reports: [{date: 'April 2, 2016', type: 'Report'},{date: 'April 10, 2016', type: 'Follow-up Report'},{date: 'May 15, 2016', type: 'Follow-up Report'},{date: 'July 4, 2016', type: 'Follow-up Report'}]}
];

//var reportss = JSON.stringify(REPORTS);
//reportss = JSON.parse(reportss)
//console.log(reportss);

ReactDOM.render(
  <AuditReportSearchTool url='//api.myjson.com/bins/39p1t' />,
  document.getElementById('auditor-search-container')
);
