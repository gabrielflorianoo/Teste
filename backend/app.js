import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express, { urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';

import usersRouter from './routes/users.js';
import favoritosRouter from './routes/favoritos.js';
import 'dotenv/config';
import './bd/Servidor.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));
app.use(session({
	secret: process.env.SESSION_SECRET || 'segredo_muito_secreto',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 3600000, sameSite: 'lax' }
}))

app.use('/users', usersRouter);
app.use('/favoritos', favoritosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

const port = 8000;
app.listen(port, function () {
	console.log(`🚀 Rodando na porta ${port}`);
});