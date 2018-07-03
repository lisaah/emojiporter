'use strict';

const fs = require('fs');
const path = require('path');
const isUri = require('valid-url').isUri;
const request = require('request');

const loadYaml = require('../helpers/loadYaml');

function addEmoji(client, creator_id, name, tmpFileName, success, error) {
  client.createCustomEmoji({
    name: name,
    creator_id: creator_id
  }, fs.createReadStream(tmpFileName))
  .then(data => {
    console.log(`Imported ${name}`);
    success(data);
  })
  .catch(err => {
    console.log(`Error importing ${name}:`, err);
    error(err);
  })
}


module.exports = (client, id, importFile) => {
  const creator_id = id;

  loadYaml(importFile, (yaml) => {

    if (!yaml) {
      console.error(`${importFile} is an invalid YAML file`);
      return;
    }

    const localPath = path.dirname(importFile);
    yaml.emojis.forEach((emoji) => {

        const name = emoji.name;
        const src = emoji.src;
        const localSrc = path.join(localPath, src);

        if (isUri(src)) {
          // Upload remote emoji image by downloading temp file
          const tmpFileName = `__tmp__${name}`;
          request(src)
            .pipe(fs.createWriteStream(tmpFileName))
            .on('close', () => {
              addEmoji(client, creator_id, name, tmpFileName, () => {
                fs.unlink(tmpFileName, (err) => {});
              }, () => {
                fs.unlink(tmpFileName, (err) => {});
              });
            });
        } else if (fs.existsSync(localSrc)) {
          // Upload local emoji image
          addEmoji(client, creator_id, name, localSrc);
        } else {
          console.error(`Unable to process src for ${name}`);
        }
    });
  });
};
