const API_URL = '/api/allnotes';

class GetAll {

  constructor(fileManager) {
    this.fileManager = fileManager;
  }

  isValid(req) {
    return req.method === 'GET' && req.url ===  API_URL;
  }

  apply(req, res) {
    this.fileManager.list((err, files) => {
      const json = files.reduce((main, file) => {
        main[file] = this.fileManager.readSync(file);

        return main;
      }, {});

      res.json(json).end();
    });

  }
}

module.exports = GetAll;
