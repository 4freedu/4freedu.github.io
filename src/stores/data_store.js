var xtend = require('xtend'),
    findIndex = require('101/find-index'),
    { EventEmitter } = require('events');

var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

var data;
var req = new XMLHttpRequest();
req.open('GET', 'http://4freedu.github.io/data/data.json', false);
req.send(null);
if (req.status === 200) data = JSON.parse(req.responseText);

var filterParams = {
  query: '',
  tags: []
};

var filtered = data;

function toggleTag(tags, tag) {
  if (tags.some(t => t === tag)) {
    let idx = findIndex(tags, (t) => tag);
    tags.splice(idx, idx+1);
  } else {
    tags.push(tag);
  }
  return tags;
}

function filter(data, query, tags) {
  return data.filter(school =>
    school.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
    school.aka.some(name => name.toLowerCase().indexOf(query.toLowerCase()) > -1)
  ).map(school => {
    if (!tags.length) return school;
    school.products = school.products.filter(product =>
      product.tags.some(tag => tags.indexOf(tag) > -1)
    )
    return school;
  }).filter(school => school.products.length);
}

var CHANGE_EVENT = 'change';

var DataStore = xtend(EventEmitter.prototype, {
  getData: () => data,
  getResults: () => filtered,
  getFilterParams: () => filterParams,
  getUrl() {
    return 'http://freedu.com/#/?query='
      + encodeURIComponent(filterParams.query)
      + '&tags='
      + encodeURIComponent(filterParams.tags.join(','));
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  dispatcherIndex: Dispatcher.register(payload => {
    let action = payload.action;
    switch (action.source) {
      case Constants.SEARCH:
        filterParams.query = action.input;
        break;
      case Constants.TOGGLE_TAG:
        filterParams.tags = toggleTag(filterParams.tags, action.tag);
        break;
    }
    filtered = filter(data, filterParams.query, filterParams.tags);
    DataStore.emitChange(action.actionType);
    return true;
  })
});

module.exports = DataStore;
