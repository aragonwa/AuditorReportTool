var ReactDOM = require('react-dom');
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    var reportType = this.props.report.type;
    var reportDate = this.props.report.date;
    var followUpReportDate = this.props.report.followupdate;
    var formatedDate = moment(reportDate).format('MMMM M, YYYY');
    return (
      <p><strong>{reportType}</strong>: {formatedDate}</p>
      <p><strong>Follow-up report:</strong> {followIpDate}</p>
    );
  }
});