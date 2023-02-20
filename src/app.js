'use strict';

const app = require('express')();
const { readFile } = require('fs');
const port = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  if (/\/file/.test(req.path)) {
    return next();
  }

  res.send('Go to /file/[path] to load a file');
});

app.use('/file', (req, res) => {
  const file = req.path.slice(1) || 'index.html';

  readFile(`./public/${file}`, (err, data) => {
    if (!err) {
      return res.end(data);
    }

    res.sendStatus(404);
  });
});

app.listen(port);
