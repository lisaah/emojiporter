const fs = require('fs');
const isUri = require('valid-url').isUri;
const request = require('request');
const resolve = require('path').resolve;
const yaml = require('js-yaml');

function getYaml(path, callback) {
  if (isUri(path)) {
    request(path, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        callback();
      }
    });
  } else if (fs.existsSync(resolve(process.cwd(), path))) {
    callback(fs.readFileSync(path, 'utf-8'));
  } else {
    callback();
  }
}

module.exports = function(path, callback) {
  getYaml(path, (yml) => {
    callback(yaml.safeLoad(yml));
  });
};
