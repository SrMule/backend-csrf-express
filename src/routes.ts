import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/csrf-token', (req: Request, res: Response) => {
    res.json({ csrfToken: (req as any).csrfToken() });
});

router.post('/test-csrf', (req: Request, res: Response) => {
    res.json({ message: 'CSRF token valido' });
});

export default router;