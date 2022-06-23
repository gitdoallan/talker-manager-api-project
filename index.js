const express = require('express');
const bodyParser = require('body-parser');
const { readFile } = require('./helpers/fs');
const { tokenGenerator } = require('./helpers/tokenGenerator');
const { loginValidation } = require('./middlewares/loginValidation');

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

app.post('/login', loginValidation, (request, response) => {
  const generatedToken = tokenGenerator();
  const { email, password } = request.body;
  if (email && password) {
    return response.status(HTTP_OK_STATUS).json({ token: generatedToken });
  }
  return response.status(401).json({ message: 'Usuário ou senha inválidos' });
});

app.listen(PORT, () => {
  console.log('Online');
});
