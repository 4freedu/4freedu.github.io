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
    });
  },
  loadTags(tags) {
    Dispatcher.handleViewAction({
      source: Constants.LOAD_TAGS,
      tags: tags
    });
  },
  reset() {
    Dispatcher.handleViewAction({
      source: Constants.RESET
    });
  },
  submit(data) {
    submit(data);
    Dispatcher.handleViewAction({
      source: Constants.SUBMIT
    });
  }
};

module.exports = Actions;
