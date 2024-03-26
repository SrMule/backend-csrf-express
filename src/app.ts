import express from 'express';
import configureMiddlewares from './middlewares';
import routes from './routes';

const app = express();
const port = 3000;

configureMiddlewares(app);

app.use(routes);

app.listen(port, () => {
    console.log(`Escuchando puerto ${port}`);
});