const API_URL = /\/api\/notepad\/(.+?)$/;

class Delete {

  constructor(fileManager) {
    this.fileManager = fileManager;
  }

  isValid(req) {
    return req.method === 'DELETE' && API_URL.test(req.url);
  }

  apply(req, res) {
    const name = API_URL.exec(req.url)[1];

    this.fileManager.remove(name, err => {
      if (err) {
        res.statusCode = 404;
      }

      res.end();
    });
  }
}

module.exports = Delete;
