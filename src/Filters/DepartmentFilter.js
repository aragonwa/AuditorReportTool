var React = require('react');
var Select = require('react-select');
var _ = require('underscore');


module.exports = React.createClass({
  displayName: 'DepartmentFilter',
  filterByDeptSelectChange: function (dept) {
    if(dept) {
      this.props.filterByDeptSelect(dept.value);
      this.props.setPageNum(1);
    } else {
      this.props.filterByDeptSelect('');
      this.props.setPageNum(1);
    }
  },
  render: function () { 
    
    var depts = this.props.depts.sort();
    var deptsListItems = [];
    var deptsOptions = _.map(depts, function(dept){ var deptObj = {value: dept, label: dept}; return deptObj });
    deptsOptions.unshift({value: '', label:'--Show all--'})

    depts.forEach(function (dept, i) {
      deptsListItems.push(<option key={i} value={dept.toLowerCase() }>{dept}</option>)
    });
    return (

      <div className="col-sm-8">
        <label for="ar-filter-dept">Department</label>
        <Select
          name='ar-filter-dept'
          style={{marginBottom : '15px'}}
          value={this.props.filterDeptSelect}
          onChange={this.filterByDeptSelectChange}
          options={deptsOptions}
          className={'deptSelect'}
        />
     
      </div>
    )
  }
});