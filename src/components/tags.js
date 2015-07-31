var React = require('react'),
    DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

var getStateFromStore = () => ({
    allTags: DataStore.getAllTags(),
    activeTags: DataStore.getActiveTags()
});

var Tags = React.createClass({

  getInitialState() {
    var s = getStateFromStore();
    s.showTags = false;
    return s;
  },

  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStore());
  },

  selectTag(tag) {
    actions.toggleTag(tag);
  },

  toggleShowTags() {
    this.setState({ showTags: !this.state.showTags });
  },

  render() {
    return (
      <div className='clearfix'>

        {this.state.showTags && <div className='clearfix'>
          {this.state.allTags.map((t, i) => <div
            key={i}
            className={'border rounded col mr1 mb1 tag-container px1 ' +
              (this.state.activeTags.some(tag => tag === t) ? 'bg-fuchsia' : 'bg-white border-blue blue')}
            onClick={this.selectTag.bind(this, t)}
          >
            {t}
            {this.state.activeTags.some(tag => tag === t) && <i className='ml1 fa fa-times'></i>}
          </div>)}
        </div>}

        <div className='clearfix center' onClick={this.toggleShowTags}>
          <div className={(this.state.showTags ? 'fa fa-chevron-up' : 'fa fa-chevron-down') + ' gray'}></div>
        </div>

      </div>
    );
  }

});

module.exports = Tags;
