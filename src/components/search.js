var React = require('react'),
    ZeroClipboard = require('react-zeroclipboard');

var actions = require('../actions/actions'),
    DataStore = require('../stores/data_store');

var Search = React.createClass({
  search(e) {
    this.props.search(e.target.value);
  },
  render() {
    return (
      <div id='search-container clearfix' className='mb1'>
        <div className='col col-10 clearfix'>
          <input
            id='search'
            type='text'
            onChange={this.search}
            placeholder='search by school or by service'
            className='block full-width mb1 field-light'
          />
        </div>
        <div className='col col-2'>
          <ZeroClipboard text={DataStore.getUrl()}>
            <button className='button full-width'>Share</button>
          </ZeroClipboard>
        </div>
      </div>
    );
  }
});

module.exports = Search;
