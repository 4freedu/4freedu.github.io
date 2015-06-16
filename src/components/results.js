var React = require('react');

var DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

var Results = React.createClass({
  getInitialState: () => ({ results: DataStore.getResults() }),
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState({ results: DataStore.getResults() });
  },
  findTag(tag) {
    actions.toggleTag(tag);
  },
  render() {
    let results = this.state.results;
    return (
      <div className='mb4 clearfix'>
        <div className=''>
          {results.map((school, idx1) => {
            return (
              <div key={idx1 + school} className='border-bottom mb2 clearfix'>
                <p className='large mb2 center'>{school.get('name')}</p>
                <div className='clearfix'>
                  {school.get('products').map((product, idx2) => {
                    return (
                      <div key={idx2 + product} className='product col clearfix mr4 mb3 p2'>
                        <p><a className='product h3' href={product.get('url')} target='_blank'>{product.get('name')}</a></p>
                        <p>{product.get('price') + (product.get('duration') !== 'forever' ? ',' + product.get('duration') : '')}</p>
                        <div className='prod-tags clearfix'>
                          {product.get('tags').sort().map((t, idx3) => {
                            return (
                              <div
                                key={idx3 + t}
                                className='border border-blue bg-white px1 blue rounded col clearfix mr1 mb1 tag-container'
                                onClick={this.findTag.bind(this, t)}>
                                {t}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});

module.exports = Results;
