var React = require('react');

var actions = require('../actions/actions'),
    DataStore = require('../stores/data_store');

var Search = require('./search');

var Header = React.createClass({
  getInitialState: () => ({ url: encodeURIComponent(DataStore.getUrl()) }),
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState({ url: encodeURIComponent(DataStore.getUrl()) });
  },
  reset() {
    actions.reset();
  },
  render() {
    return (
      <div className='p1 mx-auto'>
        {/* site title */}
        <div className='col xlarge mr2'>
          <a onClick={this.reset} href='/#/'><span className='fuchsia'>freE</span>DU</a>
        </div>

        {/* search bar */}
        <div className='col col-9 mt1 mr2'>
          <Search />
        </div>

        {/* share buttons */}
        <div className='col clearfix col mt1'>
          <div className='col clearfix mr2'>
            <a className='twitter-share-button'
              href={`https://twitter.com/intent/tweet?status=Are you in college and like free stuff? ${this.state.url}`}
              target='_blank'
            >
              <i className='fa fa-twitter fa-2x'></i>
            </a>
          </div>
          <div className='col clearfix'>
            <a
              href='https://facebook.com'
              target='_blank'
            >
              <i className='fa fa-facebook fa-2x'></i>
            </a>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Header;
