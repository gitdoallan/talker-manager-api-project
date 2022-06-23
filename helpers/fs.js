const fs = require('fs');

const readFile = (path) => JSON.parse(fs.readFileSync(path, { encoding: 'utf8' }));

const writeFile = (path, data) => fs.writeFile(path, JSON
  .stringify(data), { encoding: 'utf8' });

module.exports = { readFile, writeFile };