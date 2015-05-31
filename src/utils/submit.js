module.exports = submit;

var DataStore = require('../stores/data_store');

function submit(school, product, price, duration, link, tags) {
  var current = DataStore.getData();
  var entry = {
    name: product,
    price: price,
    duration: duration,
    tags: tags
  };
  var updated;
  
  if (current.some(s => s === school))
    updated = current[school].products.push(entry)
  else
    updated = current.push({
      name: school,
      aka: [],
      products: [entry]
    });
  
  var r = {
    title: ['add', name, 'to', school].join(' '),
    body: JSON.stringify(updated),
    head: '',
    base: 'gh-pages'
  };
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.onload = () => {
      if (req.status >= 400)
        reject(JSON.parse(req.response).message)
      else
        resolve();
    };
    req.open();
    req.send();
  });
}
