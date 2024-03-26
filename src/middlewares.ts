import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { csrfProtection, csrfErrorHandler } from './csrfProtection';

const configureMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(morgan('dev'));
    
    app.use(cors({
        origin: function (origin, callback) {
            callback(null, true);
        },
        credentials: true
    }));
    app.use(csrfProtection);
    app.use(csrfErrorHandler);
};

export default configureMiddlewares;