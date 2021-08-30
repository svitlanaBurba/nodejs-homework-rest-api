const path = require('path');
const multer = require('multer');

const tempDir = path.join(process.cwd(), 'temp'); //путь к временной папке для сохранения аватар
// const usersDir = path.join(process.cwd(), '/public/avatars'); //путь к постоянной папке для сохранения аватара

const storageSettings = multer.diskStorage({
  //настройки сохранения файла
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 10000
  }
});

const uploadMiddleware = multer({
  //создаем middleware для обработки(считывания) файла
  storage: storageSettings
});

module.exports = uploadMiddleware;
