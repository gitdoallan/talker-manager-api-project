const rateValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 0 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = { rateValidation };
