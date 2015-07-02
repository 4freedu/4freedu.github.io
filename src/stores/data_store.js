var Immutable = require('immutable'),
    xtend = require('xtend'),
    flatten = require('flatten'),
    { EventEmitter } = require('events');

var Dispatcher = require('../dispatcher/dispatcher'),
    Constants = require('../constants/constants');

/**
 * This is where the search and filter functions are implemented
 */

var data;
var req = new XMLHttpRequest();
req.open('GET', 'http://freedu.pw/data/data.json', false);
req.send(null);
if (req.status === 200) data = Immutable.fromJS(JSON.parse(req.responseText));

var filterParams = {
  query: '',
  tags: []
};

var filtered = data;

function toggleTag(tags, tag) {
  if (tags.some(t => t === tag)) tags = tags.filter(t => t !== tag);
  else tags.push(tag);
  return tags;
}

function filter(_data, query, tags) {
  if (!query && !tags.length) return _data;
  query = query.toLowerCase();
  var results = Immutable.fromJS([]);

  if (query) {
    results = results.concat( // any school who's name matches the search
      _data.filter(school =>
        school.get('name').toLowerCase().indexOf(query) > -1 ||
        school.get('aka').some(name => name.toLowerCase().indexOf(query) > -1)
      )
    );
    results = results.concat( // any school who's name didn't match the search, search through its products
      _data.filterNot(school =>
        Immutable.fromJS(results).includes(school)
      ).map(school => {
        school = school.toJS();
        school.products = school.products.filter(product =>
          product.name.toLowerCase().indexOf(query) > -1
        );
        return Immutable.fromJS(school);
      }).filter(school => school.get('products').size > 0)
    );
  } else {
    results = _data;
  }

  if (tags.length) { // now narrow down by tags
    results = results.map(school => {
      school = school.toJS();
      school.products = school.products.filter(product =>
        tags.every(tag => product.tags.indexOf(tag) > -1)
      );
      return Immutable.fromJS(school);
    }).filter(school => school.get('products').size > 0);
  }

  return results;
}

var CHANGE_EVENT = 'change';

var DataStore = xtend(EventEmitter.prototype, {
  getData: () => data,
  getSchools: () => data.map(school => school.get('name')),
  getResults: () => filtered,
  getActiveTags: () => filterParams.tags,
  getAllTags() {
    var tags = filtered.map(school =>
      school.get('products').map(product => product.get('tags'))
    );
    return flatten(tags.toJS())
      .sort().filter((t, i, arr) => t !== arr[i - 1]); // dedupe
  },
  getFilterParams: () => filterParams,
  getUrl() {
    if (!filterParams.query && !filterParams.tags.length) return '4freedu.github.io';
    var q = filterParams.query ? 'query=' + encodeURIComponent(filterParams.query) : '';
    var t = filterParams.tags.length ? 'tags=' + encodeURIComponent(filterParams.tags.join(',')) : '';
    return `http://4freedu.github.io/#/?${q}${(q && t) && '&'}${t}`;
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
      case Constants.RESET:
        filterParams.query = '';
        filterParams.tags = [];
        break;
    }
    filtered = filter(data, filterParams.query, filterParams.tags);
    DataStore.emitChange(action.actionType);
    return true;
  })
});

module.exports = DataStore;
