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
          {results.map((school,i) => {
            return (
              <div key={i+school} className='border-bottom mb2 clearfix'>
                <u><p className='large mb2 center'>{school.name}</p></u>
                <div className='clearfix'>
                  {school.products.map((product,i) => {
                    return (
                      <div key={i+product} className='product col clearfix mr4 mb3 p2'>
                        <p><a className='product h2' href={product.url} target='_blank'>{product.name}</a></p>
                        <p>{product.price + (product.duration !== 'forever' ? ',' + product.duration : '')}</p>
                        <div className='prod-tags clearfix'>
                          {product.tags.map((t,i) => {
                            return (
                              <div
                                key={i+t}
                                className='border rounded bg-blue white col clearfix mr1 mb1 tag-container white'
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
