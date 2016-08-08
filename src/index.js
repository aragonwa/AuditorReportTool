var ReactDOM = require('react-dom');
var React = require('react');
var AuditReportSearchTool = require('./AuditReportSearchTool.js');

var REPORTS = [
  { name: 'Audit: Opportunities to improve family and medical leave administration', department: 'Department of Executive Services', reports: [{date: 'February 18, 2015', type: 'Report'}, {date: 'February 10, 2016', type: 'Follow-up report'}]},
  { name: 'Audit: Another Audit', department: 'Department of Other audits', reports: [{date: 'November 23, 2015', type: 'Report'}]},
  { name: 'Audit: In-River Projects: More systematic focus needed on risk and lessons learned', department: 'Department of Natural Resources and Parks (DNRP)', reports: [{date: 'June 9, 2015', type: 'Report'}]},
  { name: 'Audit: King County 911 System: Governance structure and plan needed to move forward', department: 'Department of Executive Services', reports: [{date: 'June 23, 2015', type: 'Report'}]},
  { name: 'Audit: Driving prices in Seattle home market', department: 'Department of Housing', reports: [{date: 'August 3, 2014', type: 'Report'}, {date: 'September 20, 2014', type: 'Follow-up Report'}]},
  { name: 'Audit: Health Services for Residents', department: 'Department of Health', reports: [{date: 'January 1, 2015', type: 'Report'},{date: 'February 1, 2015', type: 'Follow-up Report'},{date: 'March 1, 2015', type: 'Follow-up Report'}]},
  { name: 'Audit: How to find mushrooms', department: 'Mushroom Department', reports: [{date: 'April 2, 2016', type: 'Report'},{date: 'April 10, 2016', type: 'Follow-up Report'},{date: 'May 15, 2016', type: 'Follow-up Report'},{date: 'July 4, 2016', type: 'Follow-up Report'}]}
];

ReactDOM.render(
  //<AuditReportSearchTool url='//api.myjson.com/bins/2b3wt'/>,
  <AuditReportSearchTool url='/src/data/data.json'/>,
  document.getElementById('auditor-search-container')
);
