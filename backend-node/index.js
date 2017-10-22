const express = require('express');
const config = require('./app/config');
const bodyParser = require('body-parser');

const app = express();

const{Pool, Client} = require('pg')

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.db,
  password: config.database.password,
  port: config.database.port,
});

pool.on('error', (err, client) => {
  console.error('Erro inesperado, cliente inativo.', err)
  process.exit(-1)
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/routes')(app, pool);

app.listen(config.server.port, () => {
  console.log('Escutando porta ' + config.server.port);
});
