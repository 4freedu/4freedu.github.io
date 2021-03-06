var React = require('react'),
    actions = require('../actions/actions');

var Search = React.createClass({
  search(e) {
    actions.search(e.target.value);
  },
  render() {
    return (
      <input
        id='search'
        type='text'
        onChange={this.search}
        placeholder='search by school or by service'
        className='field-light full-width'
      />
    );
  }
});

module.exports = Search;
