var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  displayName: 'PublishYearFilter',
  filterByPubYearSelect: function (evt) {
    this.props.filterByPubYearSelect(evt.target.value);
    this.props.setPageNum(1)
  },
  render: function () {

    var pubYears = this.props.pubYears;
    var pubYearItems = [];

    pubYears.forEach(function (year, i) {
      pubYearItems.push(<option key={i} value={year}>{year}</option>)
    });

    return (
      <div className="col-sm-4">
        <div className="form-group">
          <label for="ar-filter-pub-year">Published year</label>
          <select onChange={this.filterByPubYearSelect} className="form-control">
            <option value="">--Show all--</option>
            {pubYearItems}
          </select>
        </div>
      </div>
    )
  }
});