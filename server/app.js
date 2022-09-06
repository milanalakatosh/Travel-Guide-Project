const doteEnv = require('dotenv');
doteEnv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const PORT = process.env.PORT ?? 3100;
const { sequelize } = require('./db/models');

const authRouter = require('./routes/auth');
const formpostRouter = require('./routes/formpost');
const postsRouter = require('./routes/posts');
const excursionsRouter = require('./routes/excursion');
const excursionsFormRouter = require('./routes/excursionForm');
const excurCommentRouter = require('./routes/excurComment');
const placeCommentRouter = require('./routes/placeComment');
const yandexMapRouter = require('./routes/map');
const orderRouter = require('./routes/order');

app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:3001'], allowedHeaders: ['Content-Type'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('images'));

const sessionConfig = {
  name: 'cookieTravel',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 14 }, // 14 дней
};

app.use(session(sessionConfig));
app.use('/auth', authRouter);
app.use('/post', formpostRouter);
app.use('/posts', postsRouter);
app.use('/excursions', excursionsRouter);
app.use('/excursion', excursionsFormRouter);
app.use('/excursioComment', excurCommentRouter);
app.use('/postComment', placeCommentRouter);
app.use('/map', yandexMapRouter);
app.use('/order', orderRouter);

app.listen(process.env.PORT ?? 3100, async () => {
  console.log(`server started PORT: ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Подключение к БД успешно');
  } catch (error) {
    console.log('Не удалось подключиться к БД');
    console.log(error.message);
  }
});
