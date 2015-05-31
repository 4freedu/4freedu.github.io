var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants'),
    submit = require('../utils/submit');

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
  },
  submit(school, product, duration, link, tags) {
    submit(school, product, duration, link, tags)
    Dispatcher.handleViewAction({
      source: Constants.SUBMIT
    })
  }
};

module.exports = Actions;
