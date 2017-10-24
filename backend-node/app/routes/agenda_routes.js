module.exports = function(app, pool) {
  app.post('/api/agenda', (req, res) => {
    pool.connect((err, client, release) => {
      let contato = req.body.contato;
      let nome = req.body.nome;
      let telefonefixo = req.body.telefonefixo;
      let endereco = req.body.endereco;
      let email = req.body.email;
      let celular = req.body.celular;

      connectionError(err, res);

      client.query('insert into agenda(contato,        ' +
                   '                   nome,           ' +
                   '                   telefonefixo,   ' +
                   '                   endereco,       ' +
                   '                   email,          ' +
                   '                   celular)        ' +
                   '     values($1, $2, $3, $4, $5, $6)',
                   [contato, nome, telefonefixo, endereco, email, celular],
                   (err, item) => {
                     release();
                     execute(err, res);
                   });
    });
  });

  app.get('/api/agenda', (req, res) => {
    pool.connect((err, client, release) => {
      connectionError(err, res);

      client.query('select * from agenda', [], (err, item) => {
        release();

        if (err) {
          res.status(500).json(err);
          return console.error('Erro executanto a consulta', err.stack);
        } else {
          res.status(200).json(item.rows);
          return console.log(item.rowCount + ' registros retornados.');
        }
      });
    });
  });

  app.get('/api/agenda/:id', (req, res) => {
    let id = req.params.id;

    pool.connect((err, client, release) => {
      connectionError(err, res);

      client.query('select * from agenda where id = $1', [id], (err, item) => {
        release();

        if (err) {
          res.status(500).json(err);
          return console.error('Erro executanto a consulta', err.stack);
        } else {
          res.status(200).json(item.rows);
          return console.log(item.rowCount + ' registros retornados.');
        }
      });
    });
  });

  app.delete('/api/agenda/:id', (req, res) => {
    let id = req.params.id;

    pool.connect((err, client, release) => {
      connectionError(err, res);

      client.query('delete from agenda where id = $1', [id], (err, item) => {
        release();
        execute(err, res);
      });
    });
  });

  app.put('/api/agenda/:id', (req, res) => {
    let id = req.params.id;

    let contato = req.body.contato;
    let nome = req.body.nome;
    let telefonefixo = req.body.telefonefixo;
    let endereco = req.body.endereco;
    let email = req.body.email;
    let celular = req.body.celular;

    pool.connect((err, client, release) => {
      connectionError(err, res);

      client.query('update agenda             ' +
                   '   set contato = $1,      ' +
                   '       nome = $2,         ' +
                   '       telefonefixo = $3, ' +
                   '       endereco = $4,     ' +
                   '       email = $5,        ' +
                   '       celular = $6       ' +
                   ' where id = $7      ',
                   [contato,
                    nome,
                    telefonefixo,
                    endereco,
                    email,
                    celular,
                    id], (err, item) => {
        release();
        execute(err, res);
      });
    });
  });

  function connectionError(err, res) {
    if (err) {
      res.status(500);
      return console.error('Erro na conexão.', err.stack);
    }
  }

  function execute(err, res) {
    if (err) {
      res.status(500).json(err);
      return console.log('Erro.', err.stack);
    } else {
      res.status(200).json("Sucesso.");
      return console.log('Sucesso.');
    }
  }
}
