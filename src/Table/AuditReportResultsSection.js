var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  displayName: 'AuditReportResultsSection',
  render: function () {
    var reportItems = [];
    var reportPubDate = this.props.audit.Date_Published;
    var formatedReportPubDate = moment(reportPubDate, 'MM-DD-YYYY').format('MMMM D, YYYY');
    var reports = [];
    var reportsStyle = {padding: {paddingLeft:'20px'}, size:{fontSize:'16px'}};
    
    var reportFollowUpDate;

    reports.push(<p key="1" style={reportsStyle.padding}>{this.props.audit.ReportType}: {formatedReportPubDate}</p>);
    if(this.props.audit.FollowUpDate) {
      reportFollowUpDate = moment(this.props.audit.FollowUpDate, 'MM-DD-YYYY').format('MMMM D, YYYY');
      reports.push(<p key="0" style={reportsStyle.padding}>Follow-up report: {reportFollowUpDate}</p>);
    }
    
    var dept = this.props.audit.Dept;
    var auditName = this.props.audit.Project;
    var pageUrl = this.props.audit.PageURL;
    
    return (
    <div className="audit-report-item" style={{paddingBottom: '20px'}}>
      <p style={reportsStyle.size}>
        <a target="_blank" href={pageUrl}>
          {auditName}
        </a>
      </p>
      <p>{dept}</p>
      {reports}
    </div>
    );
  }
});
