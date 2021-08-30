const {users: service} = require('../../services');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');
const {v4: uuidv4} = require('uuid');

const usersDir = path.join(process.cwd(), '/public/avatars'); //путь к постоянной папке для сохранения аватара

const uploadUpdateAvatar = async (req, res, next) => {
  const {path: tempName, originalname} = req.file; //получаем временный путь к файлу и оригинальное имя файла
  const [extension] = originalname.split('.').reverse(); //извлекаем разширение
  const uniqueName = uuidv4() + '.' + extension;
  const fileName = path.join(usersDir, uniqueName); //создаем новое имя (полный путь к файлу) при помощи оригинального имени и пути к папке, в которой надо файл сохранить
  const {_id} = req.user; // забираем id пользователя
  console.log(_id);
  try {
    await Jimp.read(tempName)
      .then(originalname => {
        return (
          originalname
            .resize(250, 250) // resize
            .quality(60) // set JPEG quality
            // .greyscale() // set greyscale
            .write(fileName)
        ); // save
      })
      .catch(error => {
        next(error);
      });

    await service.update(_id, {avatarURL: '/avatars/' + uniqueName}); //обновляем avatarURL относительным путем

    // await fs.rename(tempName, fileName); //переименовываем файл, таким образом перезаписывая его в постоянную папку
    res.json({
      status: 'success',
      code: 200,
      data: {} // data here
    });
  } catch (error) {
    await fs.unlink(tempName); //если не удалось переместить файл из временной папки в постоянную, то удалаем файл из временной папки
    next(error);
  }
};

module.exports = uploadUpdateAvatar;
