var React = require('react'),
    ZeroClipboard = require('react-zeroclipboard');

var DataStore = require('../stores/data_store');

var Search = React.createClass({
  mixins: [ DataStore.listenTo ],
  getInitialState: () => ({ url: encodeURIComponent(DataStore.getUrl()) }),
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState({ url: encodeURIComponent(DataStore.getUrl()) });
  },
  search(e) {
    this.props.search(e.target.value);
  },
  render() {
    return (
      <div id='search-container clearfix' className='mb1'>
        <div className='col col-9 clearfix'>
          <input
            id='search'
            type='text'
            onChange={this.search}
            placeholder='search by school or by service'
            className='block full-width mb1 field-light'
          />
        </div>
        <div className='col col-2 h6 ml2'>
          <a className='twitter-share-button'
            href={`https://twitter.com/intent/tweet?status=Are you in college and like free stuff? ${this.state.url}`}
              target='_blank'>
            <ZeroClipboard text={DataStore.getUrl()}>
              <button className='button full-width'>Tweet search results!</button>
            </ZeroClipboard>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = Search;
