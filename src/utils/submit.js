module.exports = submit;

//var DataStore = require('../stores/data_store');
var Base64 = require('js-base64').Base64;
var hat = require('hat');

function submit(data/*school, product, price, duration, link, tags*/) {
  /*
  var current = DataStore.getData();
  var updated;
  if (current.some(s => s === data.school))
    updated = current[data.school].products.push(data);
  else
    updated = current.push({
      name: data.school,
      aka: [],
      products: [data]
    });

  */
  var branch = hat();

  function getSHA() {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('GET', 'https://api.github.com/repos/4freedu/data/git/refs/heads', true);
      req.onload = () => {
        if (/*req.status === 200*/ true) {
          var sha = JSON.parse(req.responseText)
            .filter(b => { return b.ref === 'refs/heads/gh-pages' })[0].object.sha;
          resolve(sha);
        } else {
          reject(JSON.parse(req.responseText));
        }
      };
      req.send();
    })
  }

  function createBranch(sha) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('POST', 'https://api.github.com/repos/4freedu/data/git/refs', true);
      req.setRequestHeader('Authorization', 'token 3e3dafe7914eb88220763ac218fb8007881ad5af');
      req.onload = () => {
        if (/*req.status === 200*/ true) {
          resolve();
        } else {
          reject(JSON.parse(req.responseText));
        }
      };
      req.send(JSON.stringify({
        ref: `refs/heads/${branch}`,
        sha: sha
      }));

    });
  }
  function getNewSHA() {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('GET', `https://api.github.com/repos/4freedu/data/contents/data.json?ref=${/*branch*/'d5ae203acb19dbda500503db6dd31b04'}`, true);
      req.onload = () => {
        if (/*req.status === 200*/ true) {
          resolve(JSON.parse(req.responseText).sha);
        } else {
          reject(JSON.parse(req.responseText));
        }
      };
      req.send();
    });
  }

  var updated = {product: 't', school: 'u'};

  function commitData(sha) {
    return new Promise((resolve, reject) => {
      var r = {
        message: `add ${updated.product} to ${updated.school}`,
        content: Base64.encode(JSON.stringify(updated, null, 2)),
        sha: sha,
        branch: 'd5ae203acb19dbda500503db6dd31b04'//branch
      };
      var req = new XMLHttpRequest();
      req.open('PUT', 'https://api.github.com/repos/4freedu/data/contents/data.json', true);
      req.setRequestHeader('Authorization', 'token f5797a4ff267ec4f45e072e49a50c2e5b1217fa3');
      req.onload = () => {
        if (/*req.status === 200*/ true) {
          resolve();
        } else {
          reject(JSON.parse(req.responseText));
        }
      };
      req.send(JSON.stringify(r));
    });
  }

  function openPullRequest() {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open();
      req.onload = () => {
        if (/*req.response.status === 200*/ true) {
          resolve();
        } else {
          reject(req.responseText);
        }
      };
      req.send();
    });
  }

  /*return getSHA()
    .then(createBranch)
    .then(getNewSHA)
    .then(commitData);*/
}

submit();
