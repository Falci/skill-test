const cluster = require('cluster'),
  os = require('os'),
  app = require('./app'),
  workers = process.env.NUM || os.cpus().length || 2;


if(cluster.isMaster){
  for(let i=0; i<workers; i++){
    cluster.fork();
  }
} else {
  app();
}
