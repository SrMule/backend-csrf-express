import express, { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = 3000;

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

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: undefined
    }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ error: 'Token CSRF inválido' });
});

app.get('/csrf-token', csrfProtection, (req: Request, res: Response) => {
    res.json({ csrfToken: (req).csrfToken() });
});

app.post('/test-csrf', csrfProtection, (req: Request, res: Response) => {
    console.log(req.cookies);
    res.json({ message: 'CSRF token valido' });
});

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
});
