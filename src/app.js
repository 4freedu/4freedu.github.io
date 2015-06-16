var React = require('react'),
    { RouteHandler, State } = require('react-router'),
    actions = require('./actions/actions');

var Header = require('./components/header'),
    Results = require('./components/results'),
    Submit = require('./components/submit'),
    Tags = require('./components/tags');

var App = React.createClass({
  mixins: [ State ],
  componentWillMount() {
    if (this.getQuery().query)
      this.search(this.getQuery().query);
    //if (this.getQuery.tags)
      //this.search(this.getQuery().tags);
  },
  search(q) { actions.search(q); },
  render() {
    return (
      <div>
        <div className='col-9 mb4 mx-auto clearfix'>
          <div className='fixed top-0 col-9 bg-white'>
          <Header />
          </div>
          <div className=' results clearfix col col-9'>
            <Results />
            <Submit />
          </div>
          <div className='tags clearfix col fixed right-0'>
            <Tags />
          </div>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = App;
