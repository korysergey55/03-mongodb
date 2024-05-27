import multer from 'multer';
import path from 'path';
import HttpError from '../helpers/HttpError.js';

const destination = path.resolve ('temp');

const storage = multer.diskStorage ({
  destination,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now ()}_${Math.round (Math.random () * 1e9)}`;
    const newFilename = `${uniquePreffix}_${file.originalname}`;
    callback (null, newFilename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extantion = file.originalname.split ('.').pop ();
  if (extantion === 'exe') {
    return callback (HttpError (400, 'exe extantion not alowed'));
  }
  callback (null, true);
};

const upload = multer ({
  storage,
  limits,
  fileFilter,
});

export default upload;
