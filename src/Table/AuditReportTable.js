var ReactDOM = require('react-dom');
var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var AuditReportResultsSection = require('./AuditReportResultsSection');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'AuditReportTable',
  render: function () {
    //Sort audits in reverse chronological order
    var audits = _.sortBy(this.props.audits, function(audit) { var date = moment(audit.Date_Published, 'MM-DD-YYYY').format(); return date; })
    audits.reverse();

    var pageNum = this.props.pageNum;
    var itemsPerPage = this.props.itemsPerPage;
    var auditItems = [];
    var errorClasses = classNames('fa', 'fa-exclamation-triangle');
    var resultsStyles = {borderTop: '4px solid #3C7893', borderBottom: '4px solid #3C7893', paddingTop: '15px'};

    audits.forEach(function (audit, i) {
      auditItems.push(<AuditReportResultsSection key={i} audit={audit} />);
    }.bind(this));
    // Check for empty array and display error
    if (auditItems === undefined || auditItems.length == 0) {
      auditItems.push(<div key="0" className="text-danger" style={{fontSize: '20px'}}><span className={errorClasses} style={{paddingBottom:'15px'}}></span> Sorry, no results</div>);
    }

    auditItems = _.first((_.rest(auditItems, [(pageNum - 1) * itemsPerPage])), itemsPerPage);
    return (
    <div className="audit-reports-results" style={resultsStyles}>
      {auditItems}
    </div>
    );
  }
});
