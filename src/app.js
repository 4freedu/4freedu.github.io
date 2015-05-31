'use strict';

var React = require('react'),
    { RouteHandler, State } = require('react-router'),
    actions = require('./actions/actions');

var Search = require('./components/search'),
    Results = require('./components/results'),
    Submit = require('./components/submit'),
    Tags = require('./components/tags');

var App = React.createClass({
  mixins: [ State ],
  componentWillMount() {
    if (this.getQuery().q)
      this.search(this.getQuery().q);
    //else if (this.getQuery().tag)
      //actions.findTag(this.getQuery().tag);
  },
  search(q) { actions.search(q); },
  render() {
    return (
      <div className='col-9 mb4 mx-auto clearfix'>
        <div className='fixed top-0 bg-white col-9 clearfix'>
          <div className='full-width'>
            <div>
              <p className='xlarge center'>
                <a href='/#/'><span className='fuchsia'>freE</span>DU</a>
              </p>
            </div>
            <Search search={this.search}/>
          </div>
        </div>
        <div className=' results clearfix col col-9'>
          <Results />
          <Submit />
        </div>
        <div className='tags clearfix col col-3'>
          <Tags />
        </div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
