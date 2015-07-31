var React = require('react'),
    Router = require('react-router'),
    { Route } = Router,
    App = require('./src/app');

var routes = (
  <Route path='/' handler={App} />
);

Router.run(routes, (Handler) => {
  React.render(<Handler />, document.getElementById('app'));
});
