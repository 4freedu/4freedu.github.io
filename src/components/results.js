var React = require('react'),
    DataStore = require('../stores/data_store'),
    actions = require('../actions/actions');

var Product = require('./product');

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
      <div className='clearfix'>
        {results.map((school, idx1) =>

          <div key={idx1} className='clearfix'>

            <hr/>

            <div className='col col-3'>
              {/* school name */}
              <p className={'large'}>
                {school.get('name')}
              </p>
            </div>

            <div className='col col-9'>
              {/* products */}
              {school.get('products').map((product, idx2) =>

                <Product
                  key={idx2}
                  href={product.get('url')}
                  name={product.get('name')}
                  price={product.get('price')}
                  duration={product.get('duration')}
                  tags={product.get('tags')}
                />

              )}

            </div>

          </div>

        )}
      </div>
    );
  }
});

module.exports = Results;
