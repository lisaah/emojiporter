'use strict';

const fs = require('fs');
const path = require('path');
const isUri = require('valid-url').isUri;
const request = require('request');

const loadYaml = require('../helpers/loadYaml');

function addEmoji(client, creator_id, name, stream,
  success, error) {
  client.createCustomEmoji({
      creator_id: creator_id,
      name: name
  }, stream).then(
  (data) => {
      console.log(`Imported ${name}`);
      if (success) success(data);
  },
  (err) => {
      console.log(`Error importing ${name}`, err);
      if (error) error(err);
  });
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
            const stream = request(src);
            addEmoji(client, creator_id, name, stream);
          } else if (fs.existsSync(localSrc)) {
            // Upload local emoji image
            addEmoji(client, creator_id, name, fs.createReadStream(localSrc));
          } else {
            console.error(`Unable to process src for ${name}`);
          }
      });
    });
};
