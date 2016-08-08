var ReactDOM = require('react-dom');
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  displayName: 'AuditReportResultsSection',
  render: function () {
    var reportItems = [];
    //var reports = this.props.audit.reports;
    var reportPubDate = this.props.audit.Date_Published;
    var formatedReportPubDate = moment(reportPubDate, 'MM-DD-YYYY').format('MMMM M, YYYY');
    
    var reportFollowUpDateVisible = 'show';
    var reportFollowUpDate;
    if(this.props.audit.FollowUpDate) {
      reportFollowUpDateVisible = 'show';
      reportFollowUpDate = moment(this.props.audit.FollowUpDate, 'MM-DD-YYYY').format('MMMM M, YYYY');
    } else {
        reportFollowUpDateVisible = 'hidden';
    }
    
    var dept = this.props.audit.Dept;
    var auditName = this.props.audit.Project;
    var pageUrl = this.props.audit.PageURL;
    var reportType = this.props.audit.ReportType;
    
    return (
    <div className="audit-report-item" style={{paddingBottom: '20px'}}>
      <p>
        <a target="_blank" href={pageUrl}>
          {auditName}
        </a>
      </p>
      <p>
        {dept}
      </p>
      <p style={{paddingLeft: '20px'}}><strong>{reportType}:</strong> {formatedReportPubDate}</p>
      <p className={reportFollowUpDateVisible} style={{paddingLeft: '20px'}}><strong>Follow-up report:</strong> {reportFollowUpDate}</p>
    </div>
    );
  }
});
