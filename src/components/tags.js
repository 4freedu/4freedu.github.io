var React = require('react'),
    flatten = require('flatten');

var DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

function getStateFromStore() {
  var allTags = DataStore.getData().map(school =>
    school.products.map(product =>
      product.tags
    )
  );  
  return {
    allTags: flatten(allTags)
      .sort()
      .filter((t,i,a) => t !== a[i-1]),
    activeTags: DataStore.getFilterParams().tags
  };
}

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
      <div className='clearfix bg-white'>
        <p className='large center'>Tags</p>
        {this.state.allTags.map((t,i) => {
          return (
            <div 
              key={i+t}
              className={'border rounded white col mr1 mb1 tag-container white ' +
              (this.state.activeTags.some(tag => tag === t) ? 'bg-fuchsia' : 'bg-blue')}
              onClick={this.selectTag.bind(this, t)}>
              {t}
              {this.state.activeTags.some(tag => tag === t) && <i className='ml1 mr1 fa fa-times'> </i>}
            </div>
          );
        })}
      </div>
    );
  }
});

module.exports = Tags;
