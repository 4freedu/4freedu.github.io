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
      actions.search(this.getQuery().query);
    //if (this.getQuery.tags)
      //this.search(this.getQuery().tags);
  },

  render() {
    return (
      <div className='col-9 mx-auto'>

        <div className='fixed col-9 bg-white border-bottom'>
          <Header />
          <Tags />
        </div>


        <div className='py4 clearfix'>
          <Results />
        </div>

        <div className={''/*'results clearfix col col-9'*/}>
          {/*<Submit />*/}
        </div>

        <RouteHandler />

      </div>
    );
  }

});

module.exports = App;
