var React = require('react');

var DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

var getStateFromStore = () => ({
    allTags: DataStore.getAllTags(),
    activeTags: DataStore.getActiveTags()
});

var Tags = React.createClass({
  getInitialState: () => getStateFromStore(),
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState(getStateFromStore());
  },
  selectTag(tag) {
    actions.toggleTag(tag);
  },
  render() {
    return (
      <div className='clearfix'>
        <p className='large center'>Tags</p>
        {this.state.allTags.map((t, i) => <div
          key={i + t}
          className={'border rounded white col mr1 mb1 tag-container px1 ' + (this.state.activeTags.some(tag => tag === t) ? 'bg-fuchsia white' : 'bg-white border-blue blue')}
          onClick={this.selectTag.bind(this, t)}
        >
          {t}
          {this.state.activeTags.some(tag => tag === t) && <i className='ml1 fa fa-times'></i>}
        </div>)}
      </div>
    );
  }
});

module.exports = Tags;
