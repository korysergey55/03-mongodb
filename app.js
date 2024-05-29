import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config()

const app = express ();

app.use (express.json ());
app.use (cors ());
app.use (morgan ('dev'));

app.use('/api/contacts', contactsRouter);
app.use('/users', authRouter)

app.use(express.static('public'));
app.use(express.static('avatars'));

app.use ((_, res) => {
  res.status (404).json ({message: 'Route not found'});
});

app.use ((err, req, res, next) => {
  const {status = 500, message = 'Internal Server Error'} = err;
  res.status (status).json ({message});
});


mongoose
  .connect (process.env.DB_HOST)
  .then (() => {
    console.log ('Database connection successful');
    app.listen (3000, () => {
      console.log ('Server is running. Use our API on port: 3000');
    });
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  });
