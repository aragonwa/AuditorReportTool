var ReactDOM = require('react-dom');
var React = require('react');
var AuditReportSearchTool = require('./AuditReportSearchTool.js');

ReactDOM.render(
  <AuditReportSearchTool url='/src/data/data.json'/>,
  document.getElementById('auditor-search-container')
);
