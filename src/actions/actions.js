var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

var Actions = {
  search(input) {
    Dispatcher.handleViewAction({
      source: Constants.SEARCH,
      input: input
    });
  },
  toggleTag(tag) {
    Dispatcher.handleViewAction({
      source: Constants.TOGGLE_TAG,
      tag: tag
    })
  }
};

module.exports = Actions;
