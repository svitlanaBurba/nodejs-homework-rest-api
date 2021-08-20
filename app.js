const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const api = require('./routes/api');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); //создание app (наш сервер)

const {DB_HOST, PORT = 3000} = process.env;
// const PORT = process.env.PORT || 3000;
console.log(process.env.DB_HOST);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(async () => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .catch(error => console.log(error));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors()); //разрешает кросс-доменные запросы
app.use(express.json()); //мидлвара для парсинга из json в объект

app.use('/api/contacts', api.contacts);

// app.use((req, res) => {
//   res.status(404).json({status: 'error', code: 404, message: 'Not found'});
// });

app.use((error, req, res, next) => {
  const {statusCode: code = 500, message = 'Server error'} = error;
  res.status(code).json({status: 'error', code, message});
});

module.exports = app;
