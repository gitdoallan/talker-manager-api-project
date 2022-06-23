const read = require('fs');
const write = require('fs').promises;

const readFile = (path) => JSON.parse(read.readFileSync(path, { encoding: 'utf8' }));

const writeFile = (path, data) => write.writeFile(path, JSON
  .stringify(data), { encoding: 'utf8' });

module.exports = { readFile, writeFile };
