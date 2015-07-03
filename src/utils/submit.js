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
        if (/*req.reponse.status === 200*/ true) {
          var sha = JSON.parse(req.responseText)
            .filter(b => { return b.ref === 'refs/heads/gh-pages' })[0].object.sha;
          resolve(sha);
        } else {
          reject();
        }
      };
      req.send();
    })
  }

  function createBranch(sha) {
    return new Promise((resolve, reject) => {
      var req = new XMLHttpRequest();
      req.open('POST', 'https://api.github.com/repos/4freedu/data/git/refs', true);
      req.setRequestHeader('Authorization', 'token 2860f6ed1f3611cd8c08facd63af562f3fc2e02f');
      req.onload = () => {
        if (/*req.reponse.status === 200*/ true) {
          resolve(sha);
        } else {
          reject();
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
      req.open('PUT', 'https://api.github.com/repos/4freedu/data/content/data.json', true);
      req.onload = () => {
        if (/*req.response.status === 200*/ true) {
          resolve(JSON.parse(req.responseText).sha);
        } else {
          reject();
        }
      };
      req.send(JSON.stringify({
        ref: branch,
        path: 'data.json'
      }));
    });
  }

  var updated = {product: 't', school: 'u'};

  function commitData(sha) {
    return new Promise((resolve, reject) => {
      var reqData = {
        path: 'data',
        message: `add ${updated.product} to ${updated.school}`,
        content: Base64.encode(JSON.stringify(updated, null, 2)),
        sha: sha,
        branch: branch
      };
      var req = new XMLHttpRequest();
      req.open('PUT', 'https://api.github.com/repos/4freedu/data/contents/data.json', true);
      req.setRequestHeader('Authorization', 'token 2860f6ed1f3611cd8c08facd63af562f3fc2e02f');
      req.onload = () => {
        if (/* req.response.status === 200 */ true) {
          resolve();
        } else {
          reject();
        }
      };
      req.send(JSON.stringify(reqData));
    });
  }

  return getSHA()
    .then(createBranch)
    .then(commitData);
}

submit();
