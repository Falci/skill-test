const http = require('http'),
  FileManager = require('./modules/FileManager'),
  Get = require('./modules/Get'),
  GetAll = require('./modules/GetAll'),
  Save = require('./modules/Save'),
  Delete = require('./modules/Delete'),
  Cripto = require('./modules/Cripto'),

  cripto = new Cripto('my salt'),
  fileManager = new FileManager(cripto),

  handlers = [
    new Get(fileManager),
    new GetAll(fileManager),
    new Save(fileManager),
    new Delete(fileManager)
  ];

const app = () => {
  const server = http.createServer((req, res) => {
    // helper: res.json({a: 1}).end();
    res.json = json => {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(json));
      return res;
    };

    const valid = handlers.filter(handler => handler.isValid(req));

    if(!valid.length) {
      res.statusCode = 404;
      res.end();
    }

    valid.forEach(handler => handler.apply(req, res));
  });

  server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log('Magic happens on port', port);
  });

  return server;
}

module.exports = app;
