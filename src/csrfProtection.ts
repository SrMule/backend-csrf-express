import { Request, Response, NextFunction } from 'express';
import csrf from 'csurf';

const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: undefined
    }
});

const csrfErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ error: 'Token CSRF inválido' });
};

export { csrfProtection, csrfErrorHandler };