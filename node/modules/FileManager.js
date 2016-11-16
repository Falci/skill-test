const fs = require('fs'),
  path = require('path');

const FOLDER = path.join(__dirname, '..', 'notes');

class FileManager {

  constructor(cripto) {
    this.cripto = cripto;
  }

  list(callback) {
    fs.readdir(FOLDER, callback);
  }

  read(name, callback) {
    fs.readFile(path.join(FOLDER, name), 'utf8', (err, content) => {
      if (err) return callback(err);

      const plain = this.cripto.decipher(content);
      callback(null, plain);
    });
  }

  readSync(name) {
    const content = fs.readFileSync(path.join(FOLDER, name), 'utf8'),
      plain = this.cripto.decipher(content);
      
    return plain;
  }

  write(name, content, callback) {
    const ciphered = this.cripto.cipher(content);

    fs.writeFile(path.join(FOLDER, name), ciphered, 'utf8', callback);
  }

  remove(name, callback) {
    const file = path.join(FOLDER, name);

    fs.exists(file, exists => {
      if(!exists) return callback('File not found');

      fs.unlink(file, callback);
    });
  }
}

module.exports = FileManager;
