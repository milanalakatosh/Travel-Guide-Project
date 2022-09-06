const multer = require('multer');

// созд пространства для хранения каринок
const storage = multer.diskStorage({ // папка где хранятся файлы
  destination(req, file, cb) {
    cb(null, 'images/');
  },
  filename(req, file, cb) { // как будут назыаться файлы
    cb(null, `${file.name}-${Date.now()}`);
  },
});

// типы документов которые можно хранить на сервере
const types = ['image/png', 'image/jpeg', 'image/jpg'];

// отфильтровываем элементы для загрузки
const fileFilter = (req, file, cb) => {
  if (types.includes(file.type)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
