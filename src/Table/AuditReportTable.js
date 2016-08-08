var ReactDOM = require('react-dom');
var React = require('react');
var _ = require('underscore');
var AuditReportResultsSection = require('./AuditReportResultsSection');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'AuditReportTable',
  render: function () {
    var audits = this.props.audits;
    var pageNum = this.props.pageNum;
    var itemsPerPage = this.props.itemsPerPage;
    var auditItems = [];
    var errorClasses = classNames('fa', 'fa-exclamation-triangle');

    audits.forEach(function (audit, i) {
      auditItems.push(<AuditReportResultsSection key={i} audit={audit} />);
    }.bind(this));
    // Check for empty array and display error
    if (auditItems === undefined || auditItems.length == 0) {
      auditItems.push(<div key="0" className="text-danger" style={{fontSize: '20px'}}><span className={errorClasses} style={{paddingBottom:'15px'}}></span> Sorry, no results</div>);
    }

    auditItems = _.first((_.rest(auditItems, [(pageNum - 1) * itemsPerPage])), itemsPerPage);
    return (
    <div className="audit-reports-results" style={{borderTop: '4px solid #D67619', borderBottom: '4px solid #D67619', paddingTop: '15px'}}>
      {auditItems}
    </div>
    );
  }
});
