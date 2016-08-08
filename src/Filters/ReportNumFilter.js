var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  displayName: 'ReportNumFilter',
  filterByReportNum: function() {
    if(this.refs.filterByReportNumInput.value.length > 6) {
      return;
    } else {
      this.props.filterByReportNum(
            this.refs.filterByReportNumInput.value
      );
      this.props.setPageNum(1)
    }
  },
  render: function(){
    var filterReportNum = this.props.filterReportNum;
    return (  
      <div className="col-sm-4">
        <div className="form-group">
          <label for="ar-filter-report-num">Report #</label>
          <input 
            id="ar-filter-report-num" 
            type="text" 
            placeholder="6 digits" 
            className="form-control"
            ref="filterByReportNumInput" 
            value={filterReportNum} 
            onChange={this.filterByReportNum}/>
        </div>
      </div>
    )
  }
});
