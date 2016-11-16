const API_URL = '/api/notepad';

class Save {

  constructor(fileManager) {
    this.fileManager = fileManager;
  }

  isValid(req) {
    return req.method === 'POST' && req.url ===  API_URL;
  }

  apply(req, res) {

    var body = [];
    req.on('data', chunk => body.push(chunk))
      .on('end', () => {
        const json = Buffer.concat(body)
          .toString()
          .split('&')
          .reduce((main, entry) => {
            const parts = entry.split('=').map(part => decodeURIComponent(part.replace(/\+/g, '%20')));

            main[parts[0]] = parts[1];

            return main;
          }, {});

        this.fileManager.write(json.name, json.content, err => {
          if(err) {
            res.json({
              error: err
            });
            res.statusCode = 400;
          }

          res.end();
        })

      });



    //
    // const name = req.body.name,
    //   content = req.body.content;
    //
    // this.fileManager.write(name, content, err => {
    //   if(err) {
    //     res.json({
    //       error: err
    //     });
    //     res.statusCode = 400;
    //   }
    //
    //   res.end();
    // });
  }
}

module.exports = Save;
