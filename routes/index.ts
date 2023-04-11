import express from 'express';
import plantRoutes from './plant-routes.js';

// import AuthMiddleware from "../middlewares/auth"

const app: express.Application = express();

app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express !");
});

app.use('/plant', plantRoutes);
// app.use('/auth', require('./auth-routes'));
// app.use('/referential-plant', AuthMiddleware, require('./referential-plant-routes'));


export default app;