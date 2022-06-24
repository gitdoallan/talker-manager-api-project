const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('./helpers/fs');
const { tokenGenerator } = require('./helpers/tokenGenerator');
const { loginValidation } = require('./middlewares/loginValidation');
const { tokenValidation } = require('./middlewares/tokenValidation');
const { nameValidation } = require('./middlewares/nameValidation');
const { ageValidation } = require('./middlewares/ageValidation');
const { talkValidation } = require('./middlewares/talkValidation');
const { rateValidation } = require('./middlewares/rateValidation');

const talkerJson = 'talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const talkers = readFile(talkerJson);
  if (!talkers) {
    response.status(HTTP_OK_STATUS).send([]);
  }
  response.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talkers = readFile(talkerJson);
  const findId = talkers.find((talker) => talker.id === +id);
  if (!findId) {
    response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(findId);
});

app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
rateValidation,
(request, response) => {
  const { name, age, talk } = request.body;
  const talkers = readFile(talkerJson);
  const { id } = talkers[talkers.length - 1];
  const newTalker = { id: +id + 1, name, age, talk };
  talkers.push(newTalker);
  writeFile(talkerJson, talkers);
  response.status(201).json(newTalker);
});

app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
rateValidation,
(request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const talkers = readFile(talkerJson);
  const index = talkers.findIndex((talker) => talker.id === +id);
  talkers[index].name = name;
  talkers[index].age = age;
  talkers[index].talk = talk;
  writeFile(talkerJson, talkers);
  response.status(HTTP_OK_STATUS).json(talkers[index]);
});

app.delete('/talker/:id', tokenValidation, (request, response) => {
  const { id } = request.params;
  const talkers = readFile(talkerJson);
  const index = talkers.findIndex((talker) => talker.id === +id);
  talkers.splice(index, 1);
  writeFile(talkerJson, talkers);
  response.status(204).send();
});

app.post('/login', loginValidation, (_request, response) => {
  const generatedToken = tokenGenerator();
    return response.status(HTTP_OK_STATUS).json({ token: generatedToken });
});

app.listen(PORT, () => {
  console.log('Online');
});
