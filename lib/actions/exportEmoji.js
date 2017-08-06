'use strict';

const fs = require('fs');

function createTitle(title) {
  return `title: ${title}\nemojis:\n`;
}

function createEmoji(emoji, imageUrl) {
  return `  - name: ${emoji.name}\n    src: ${imageUrl}\n`;
}

module.exports = (client, exportTitle, exportFile) => {
  let exportData = createTitle(exportTitle);

  client.listEmoji(
    (emojis) => {
      emojis.forEach((emoji) => {
        const imageUrl = client.getCustomEmojiImageUrl(emoji.id);
        console.log(`Adding ${emoji.name}`);
        exportData += createEmoji(emoji, imageUrl);
      });

      fs.writeFile(exportFile, exportData, 'utf8', (err) => {
        if (err) throw err;
        console.log(`Successfully exported emojis to ${exportFile}`);
      });
    },
    (err) => {
      console.log('err', err);
    });
  };
