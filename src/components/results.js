var React = require('react');

var DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

var Results = React.createClass({
  getInitialState() {
    return { results: DataStore.getResults() };
  },
  componentWillMount() {
    DataStore.addChangeListener(this._onChange);
  },
  _onChange() {
    this.setState({ results: DataStore.getResults() });
  },
  findTag(tag) {
    return;
    actions.findTag(tag);   
  },
  render() {
    let results = this.state.results;
    return (
      <div className='mb4 clearfix'>
        <div className=''>
          {results.map((school,i) => {
            return (
              <div key={i+school} className='border-bottom mb2 clearfix'>
                <p className='large mb2 center'>{school.name}</p>
                <div>
                  {school.products.map((product,i) => {
                    return (
                      <div key={i+product} className='product col clearfix mr4 mb3'>
                        <p><a className='product bold' href={product.url}>{product.name}</a></p>
                        <p>{product.price}</p>
                        {product.duration !== 'forever' && <p className='duration'>Duration: {product.duration}</p>}
                        {product.tags.map((t,i) => {
                          return (
                            <div 
                              key={i+t}
                              className='border rounded bg-blue white col clearfix mr1 tag-container white'
                              onClick={this.findTag.bind(this, t)}>
                              {t}
                            </div>
                          );
                        })}
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
