const crypto = require('crypto'),
  algorithm = 'aes-256-ctr';

class Cripto {
  constructor(salt){
    this.salt = salt;
  }

  cipher(text){
    const cipher = crypto.createCipher(algorithm, this.salt);

    return cipher.update(text,'utf8','hex') + cipher.final('hex');
  }

  decipher(text){
    const decipher = crypto.createDecipher(algorithm, this.salt);

    return decipher.update(text,'hex','utf8') + decipher.final('utf8');
  }
}

module.exports = Cripto;
