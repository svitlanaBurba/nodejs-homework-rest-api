const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const api = require('./routes/api');
const mongoose = require('mongoose');
require('dotenv').config(); // чтобы из env данные попали в переменные окружения

const path = require('path');

const app = express(); //создание app (наш сервер)

const {DB_HOST, PORT = 3000} = process.env;
// const PORT = process.env.PORT || 3000;

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

app.use('/api/contacts', api.contacts); //обработчик маршрута contacts
app.use('/api/users', api.users); //обработчик маршрута users

const usersDir = path.join(process.cwd(), '/public/avatars'); //путь к постоянной папке для сохранения аватара
app.use('/avatars', express.static(usersDir)); //раздача статики из постоянной папки

app.use((_, res) => {
  res.status(404).send({status: 'error', code: 404, message: 'Not found'});
});

app.use((error, _, res, __) => {
  const {status = 500, message = 'Server error'} = error;
  res.status(status).json({status: 'error', code: status, message});
});

module.exports = app;
