var React = require('react'),
    actions = require('../actions/actions'),
    DataStore = require('../stores/data_store'),
    Search = require('./search');

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
      <div className='clearfix mt2'>

        {/* site title */}
        <div className='xlarge col col-2 clearfix'>
          <a onClick={this.reset} href='/#/'>
            <span className='fuchsia'>freE</span>DU
          </a>
        </div>

        {/* search bar */}
        <div className='col col-8 clearfix'>
          <Search />
        </div>

        {/* share buttons */}
        <div className='col col-2 clearfix'>

          {/* twitter */}
          <div className='col col-6 clearfix right-align'>
            <a
              className='twitter-share-button fa fa-twitter fa-2x'
              href={`https://twitter.com/intent/tweet?status=Are you ` +
                    `in college and like free stuff? ${this.state.url}`}
              target='_blank'
            >
            </a>
          </div>

          {/* facebook */}
          <div className='col col-4 clearfix right-align'>
            <a
              href='https://facebook.com'
              target='_blank'
              className='fa fa-facebook fa-2x'
            >
            </a>
          </div>

        </div>

      </div>
    );
  }

});

module.exports = Header;
