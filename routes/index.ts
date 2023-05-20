import express from 'express';

import locationTypeRoutes from './location-type-routes.js';
import locationRoutes from './location-routes.js';
import plantVarietyRoutes from './plant-variety-routes.js';
import plantRoutes from './plant-routes.js';
import userRoutes from './user-routes.js';

// import AuthMiddleware from "../middlewares/auth"

const app: express.Application = express();
app.use(express.json());
app.get('/', (_req, _res) => {
    _res.send("TypeScript With Express !");
});

app.use('/location-types', locationTypeRoutes);
app.use('/location', locationRoutes);
app.use('/plant-varieties', plantVarietyRoutes);
app.use('/plant', plantRoutes);
app.use('/users', userRoutes)

// app.use('/auth', require('./auth-routes'));
// app.use('/referential-plant', AuthMiddleware, require('./referential-plant-routes'));


export default app;