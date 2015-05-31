var Dispatcher = require('flux').Dispatcher,
    xtend = require('xtend/mutable');

module.exports = xtend(new Dispatcher(), {
  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});
