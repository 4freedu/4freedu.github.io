var React = require('react');

var actions = require('../actions/actions');

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
        className='full-width field-light'
      />
    );
  }
});

module.exports = Search;
