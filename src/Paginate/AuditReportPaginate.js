var ReactDOM = require('react-dom');
var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
  displayName: 'AuditReportPaginate',
  decreasePageNum: function(e){
    e.preventDefault();
    if(this.props.pageNum <= 1){
      return
    } 
    this.props.decreasePageNum(this.props.pageNum - 1)
  },
  increasePageNum: function(e){
    e.preventDefault();
    if(this.props.pageNum * this.props.itemsPerPage >= this.props.audits.length){
      return
    }
    this.props.increasePageNum(this.props.pageNum + 1);
  },
  setPageNumIndex: function(index, e){
    e.preventDefault();
    this.props.setPageNumIndex(index+1);
  },
  render: function(){
    var audits = this.props.audits;
    var filteredAudits = this.props.filteredAudits;
    var pageNum = this.props.pageNum;
    var itemsPerPage = this.props.itemsPerPage;
    
    var previousDisabledClass = '';
    var nextDisabledClass = '';
    var paginationItems = [];

    var itemsStart = (((pageNum-1) * 10) + 1);
    var itemsEnd = (itemsStart + _.first((_.rest(audits, [(pageNum - 1) * itemsPerPage])), itemsPerPage).length) - 1;
    var activePageNumClass = '';
    var paginationVisible;

    //TODO: If no audits, don't display pagination
    if(pageNum <= 1) {
      previousDisabledClass = 'previous disabled';
    } else {
      previousDisabledClass = 'previous';
    }
    if(pageNum * itemsPerPage >= audits.length) {
      nextDisabledClass = 'next disabled';
    } else {
      nextDisabledClass = 'next';
    }
    for(var i = 0; i < Math.ceil(audits.length/itemsPerPage); i++) {
      //If page num is equal to current page add class .active
      if(pageNum === (i+1))
      {
        activePageNumClass = 'active';
      } else {
        activePageNumClass = '';
      }
      paginationItems.push(<li key={i} className={activePageNumClass}><a href="#" onClick={this.setPageNumIndex.bind(null, i)} data-page-id={i}>{i+1}</a></li>)
    };
    //If now audits array -- don't show the pagination
    if(typeof audits != 'undefined' && audits != null && audits.length > 0) {
      paginationVisible = 'show';
    } else {
      paginationVisible = 'hidden';
    }

    return (
      <div className={paginationVisible}>
        <div className="row">
          <div className="col-xs-4">
            <p style={{margin: '20px 0'}}>Showing {itemsStart}-{itemsEnd} of {audits.length} reports</p>
          </div>
          <div className="col-xs-8">
            <nav className="pull-right">
              <ul className="pagination">
                <li className={previousDisabledClass} ><a href="#" onClick={this.decreasePageNum}>Previous</a></li>
                  {paginationItems}
                <li className={nextDisabledClass}><a href="#" onClick={this.increasePageNum}>Next</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
});