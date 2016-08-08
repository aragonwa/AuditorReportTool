var ReactDOM = require('react-dom');
var React = require('react');

module.exports = React.createClass({
  displayName: 'SearchFilter',
  filterBySearchText: function () {
    this.props.filterBySearchText(
      this.refs.filterTextInput.value
    );
    this.props.setPageNum(1)
  },
  render: function () {
    var filterSearchText = this.props.filterSearchText;
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label for="ar-search">Search</label>
            <input
              value={filterSearchText}
              ref="filterTextInput"
              onChange={this.filterBySearchText}
              id="ar-search"
              type="text"
              placeholder="Type title or keywords"
              className="form-control"
              />
          </div>
        </div>
      </div>
    )
  }
});