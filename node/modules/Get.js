const API_URL = /\/api\/notepad\?name=(.+?)$/;

class Get {

  constructor(fileManager) {
    this.fileManager = fileManager;
  }

  isValid(req) {
    return req.method === 'GET' && API_URL.test(req.url);
  }

  apply(req, res) {
    const name = API_URL.exec(req.url)[1];

    this.fileManager.read(name, (err, data) => {
      if (err) {
        res.statusCode = 404;

        return;
      }

      res.write(data);
      res.end();
    });
  }
}

module.exports = Get;
