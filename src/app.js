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
    if (this.getQuery().query)
      this.search(this.getQuery().query);
    if (this.getQuery.tags)
      this.search(this.getQuery().tags);
  },
  search(q) { actions.search(q); },
  render() {
    return (
      <div>
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
        <div className='clearfix border-top border-blue'>
          <div className='px-4'>
              This has been an abrokwa joint! <a className ='center' href='https://github.com/4freedu/4freedu.github.io'>View on github</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
