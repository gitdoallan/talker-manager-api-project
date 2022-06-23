const { TOKEN_SIZE } = require('./magicNumbers');

function tokenGenerator() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const generatedToken = new Array(TOKEN_SIZE).fill(''); 

  generatedToken.forEach((_e, i) => {
    generatedToken[i] = characters.charAt(Math.floor(Math.random() * characters.length));
  });

  return generatedToken.join('');
}

module.exports = { tokenGenerator };
