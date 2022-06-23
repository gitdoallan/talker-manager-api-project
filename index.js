const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./helpers/fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const talkers = readFile('talker.json');
  if (!talkers) {
    response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talkers = readFile('talker.json');
  const findId = talkers.find((talker) => talker.id === +id);
  if (!findId) {
    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(findId);
});

app.listen(PORT, () => {
  console.log('Online');
});
